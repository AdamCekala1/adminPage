import { Injectable } from '@angular/core';
import { clone, cloneDeep, get, isEqual, isEmpty, filter, findIndex, forEach, map, merge, times, toNumber } from 'lodash';
import * as moment from 'moment';
import { CALENDARCONSTANTS } from '../calendar.contants';
import { MemoizeObject } from 'memoize-object-decorator';
import { StorageCalendar } from './storage-calendar.service';
import { LanguageService } from './language.service';
import { combineLatest } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import {
  IDay,
  IMapDays,
  IMapMonths,
  IMonth,
  IMonthWithValues,
  INumberOfMissingDaysConfig, ISelectedDays,
  IUserDataDay,
  IUserDataInput
} from '../shared/calendar.interface';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import { SelectDayType } from '../shared/select-day-type.enum';
import { SelectDayMode } from '../shared/select-day-mode.enum';
import { UserDataService } from './user-data.service';
import { StorageCalendarKey } from '../shared/storage-keys.enums';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private storageCalendar: StorageCalendar,
              private userDataService: UserDataService,
              private languageService: LanguageService) {
    combineLatest(
      this.languageService.getLanguage()
        .pipe(tap((language: string) => {
          this.storageCalendar.setToStorage(StorageCalendarKey.DAYS_NAMES, this.getDaysNames(language));
          this.storageCalendar.setToStorage(StorageCalendarKey.MONTH_NAMES, this.getMonthsNames(language));
        })),
      this.storageCalendar.getFromStorage(StorageCalendarKey.SELECTED_YEAR),
      this.storageCalendar.getFromStorage(StorageCalendarKey.SELECTED_MONTH),
    ).pipe(debounceTime(200))
      .subscribe(([language, actualYear, actualMonth]: [string, number, number]) => {
        const month: IMonth = this.mapMonths({
          range: {year: actualYear, startMonth: actualMonth},
          currentDate: moment().format(CALENDARCONSTANTS.FORMAT.CLASIC_FORMAT),
          language,
        });

        this.storageCalendar.addMonthToYear(month);
        this.storageCalendar.setToStorage(StorageCalendarKey.CURRENT_MONTH, month);
      });

    combineLatest(
      this.storageCalendar.getFromStorage(StorageCalendarKey.CURRENT_MONTH),
      this.storageCalendar.getFromStorage(StorageCalendarKey.USER_INPUT_DATA),
    )
      .subscribe(([month]: [IMonth, IUserDataInput]) => {
        if(month) {
          this.setUpdatedCalendarByUserData(month);
        }
      });
  }

  getDaysWithSelectedFlags(selected: ISelectedDays, days: IDay[], dataSet: number, mode?: SelectDayMode): IDay[] {
    const foundDates: {index: string, type: SelectDayType}[] = [];

    if(selected[SelectDayType.START] || selected[SelectDayType.END]) {
      const selectedDayStart: string = get(selected, `[${SelectDayType.START}].index`);
      const selectedDayEnd: string = get(selected, `[${SelectDayType.END}].index`);

      return map(days, (day: IDay) => {
        day.isActive = day.index === selectedDayStart || day.index === selectedDayEnd;
        day.isDisabled =  dataSet !== 0 && selectedDayStart && mode === SelectDayMode.HALF_DOUBLE && day.index < selectedDayStart;
        day.isInRange = selectedDayStart && selectedDayEnd && day.index >= selectedDayStart && day.index <= selectedDayEnd;

        return day;
      });
    }

    return days;
  }

  setUpdatedCalendarByUserData(month: IMonth) {
    let mergedCalendarWithData: IMonthWithValues = this.getUpdatedMonth(month, true, false);

    mergedCalendarWithData = this.getUpdatedMonth(mergedCalendarWithData, false, true);
    mergedCalendarWithData = this.getUpdatedMonth(mergedCalendarWithData);

    this.storageCalendar.setToStorage(StorageCalendarKey.CURRENT_MONTH_WITH_VALUES, mergedCalendarWithData);
  }

  @MemoizeObject()
  getUpdatedCalendarWithUserData(month: IMonth, data: IDictionary<IUserDataDay>, monthNumber?: number, yearNumber?: number): IMonthWithValues {
    const updatedMonth: IMonthWithValues = cloneDeep(month) as IMonthWithValues;

    forEach(data, (value: IUserDataDay, numberOfDay: number) => {
      const foundIndex: number = findIndex(updatedMonth.days, {
        date: {
          month: (monthNumber || monthNumber === 0) ? monthNumber : month.monthNumberInYear,
          year: yearNumber || month.year,
          day: toNumber(numberOfDay),
        }
      });

      if (foundIndex > -1) {
        const actualDay: IDay = updatedMonth.days[foundIndex];

        updatedMonth.days[foundIndex] = merge({}, actualDay, value);
      }
    });

    return updatedMonth;
  }

  @MemoizeObject()
  getDaysNames(language: string): string[] {
    return times(7, (dayNumber: number) => moment().weekday(dayNumber).format('dddd'));
  }

  @MemoizeObject()
  mapMonths(config: IMapMonths): IMonth {
    const currentDateMoment: moment.Moment = moment(config.currentDate);
    const actualNumberOfMonth: number = config.range.startMonth;
    const monthMoment: moment.Moment = moment([config.range.year, actualNumberOfMonth]);
    const newMonth: IMonth = {
      year: config.range.year,
      monthNumberInYear: actualNumberOfMonth,
      id: `${config.range.year}-${actualNumberOfMonth}`,
      name: monthMoment.format('MMMM'),
      isCurrent: currentDateMoment.diff(monthMoment, 'month') === 0,
      isActive: false,
      days: this.getMappedDays({
        monthNumber: actualNumberOfMonth,
        year: config.range.year,
        currentDate: config.currentDate,
        language: config.language,
      })
    };

    return newMonth;
  }

  @MemoizeObject()
  private getMappedDays(config: IMapDays): IDay[] {
    const daysInMonth: number = moment([config.year, config.monthNumber]).daysInMonth();
    const currentDateMoment: moment.Moment = moment(config.currentDate).startOf('day');
    const days: IDay[] = [];
    const missingDays: { begin: number, end: number } = this.getNumberOfMissingDays({
      monthNumber: config.monthNumber,
      year: config.year,
      language: config.language,
    });

    if (missingDays.begin) {
      times(missingDays.begin, (i: number) => {
        const calculatedDate: { year: number, month: number } = this.calculateMonthAndYear(config.year, config.monthNumber - 1);
        const numberOfDaysInMonth: number = moment([calculatedDate.year, calculatedDate.month]).daysInMonth();
        const momentDay: moment.Moment = moment([calculatedDate.year, calculatedDate.month, numberOfDaysInMonth - i]);

        days.unshift({
          date: {
            year: calculatedDate.year,
            month: calculatedDate.month,
            day: numberOfDaysInMonth - i,
          },
          isPrev: true,
          index: momentDay.format(CALENDARCONSTANTS.FORMAT.ID),
          name: momentDay.format(CALENDARCONSTANTS.FORMAT.DISPLAY),
          month: calculatedDate.month,
          year: calculatedDate.year,
          moment: momentDay,
          isActive: false,
          isCurrent: currentDateMoment.diff(momentDay, 'days') === 0,
          isDisabled: false,
          isDifferentMonth: true,
        });
      });
    }

    times(daysInMonth, (i: number) => {
      const momentDay: moment.Moment = moment([config.year, config.monthNumber, i + 1]);
      const formatted: string = momentDay.format('YYYY-MM-DD');

      days.push({
        date: {
          year: config.year,
          month: config.monthNumber,
          day: i + 1,
        },
        index: momentDay.format(CALENDARCONSTANTS.FORMAT.ID),
        moment: momentDay,
        name: momentDay.format(CALENDARCONSTANTS.FORMAT.DISPLAY),
        month: config.monthNumber,
        formatted,
        year: config.year,
        isActive: false,
        isInRange: false,
        isCurrent: currentDateMoment.diff(momentDay, 'days') === 0,
        isDisabled: false,
        isDifferentMonth: false,
      });
    });

    if (missingDays.end) {
      times(missingDays.end, (i: number) => {
        const calculatedDate: { year: number, month: number } = this.calculateMonthAndYear(config.year, config.monthNumber + 1);
        const momentDay: moment.Moment = moment([calculatedDate.year, calculatedDate.month, i + 1]);

        days.push({
          date: {
            year: calculatedDate.year,
            month: calculatedDate.month,
            day: i + 1,
          },
          isAfter: true,
          index: momentDay.format(CALENDARCONSTANTS.FORMAT.ID),
          name: momentDay.format(CALENDARCONSTANTS.FORMAT.DISPLAY),
          month: calculatedDate.month,
          year: calculatedDate.year,
          isActive: false,
          moment: momentDay,
          isCurrent: currentDateMoment.diff(momentDay, 'days') === 0,
          isDisabled: false,
          isDifferentMonth: true,
        });
      });
    }

    return days;
  }

  @MemoizeObject()
  private calculateMonthAndYear(year, month): { year: number, month: number } {
    if (month < 12 && month >= 0) {
      return {
        year,
        month,
      };
    } else if (month < 0) {
      return {
        year: year - 1,
        month: 11,
      };
    }

    return {
      year: year + 1,
      month: 0,
    };
  }

  @MemoizeObject()
  private getNumberOfMissingDays(config: INumberOfMissingDaysConfig): { begin: number, end: number } {
    const daysInMonth: number = moment([config.year, config.monthNumber]).daysInMonth();
    const begin: number = moment([config.year, config.monthNumber, 1]).weekday();
    const beginFormatted: number = begin < 7 && begin >= 0 ? begin : 0;
    const end: number = 7 - moment([config.year, config.monthNumber, daysInMonth]).weekday() - 1;
    const endFormatted: number = end < 7 && end >= 0 ? end : 0;

    return {
      begin: beginFormatted,
      end: endFormatted,
    };
  }

  @MemoizeObject()
  private getMonthsNames(language: string) {
    return times(12, (i: number) => ({
      name: moment().month(i).format('MMMM'),
      monthNumberInYear: i,
    }));
  }

  private getUpdatedMonth(month: IMonth, isAfter?: boolean, isPrev?: boolean): IMonth {
    const days: IDay[] = (isAfter || isPrev) ? filter(month.days, isAfter ? 'isAfter' : 'isPrev') : month.days;
    const shouldGetDateFromDays: boolean = (isPrev || isAfter) && !!days.length;
    const monthNumber: number = shouldGetDateFromDays ? days[0].date.month : month.monthNumberInYear;
    const year: number = shouldGetDateFromDays ? days[0].date.year : month.year;
    const userDataForAfterMonth: IDictionary<IUserDataDay>
      = this.userDataService.getUserDataValueByMonthAndYear(year, monthNumber);

    if (!isEmpty(userDataForAfterMonth)) {
      return this.getUpdatedCalendarWithUserData(month, userDataForAfterMonth, monthNumber, year);
    }

    return month;
  }
}
