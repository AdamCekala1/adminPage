import { Injectable } from '@angular/core';
import { clone, cloneDeep, isEqual, isEmpty, findIndex, forEach, map, merge, times, toNumber } from 'lodash';
import * as moment from 'moment';
import { CALENDARCONSTANTS } from '../calendar.contants';
import { MemoizeObject } from 'memoize-object-decorator';
import { CalendarDataHandlerService } from './calendar-data-handler.service';
import { LanguageService } from './language.service';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  IDay,
  IMapDays,
  IMapMonths,
  IMonth,
  IMonthWithValues,
  INumberOfMissingDaysConfig,
  IUserDataDay
} from '../shared/calendar.interface';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private calendarDataHandlerService: CalendarDataHandlerService,
              private languageService: LanguageService) {
    combineLatest(
      this.languageService.getLanguage()
        .pipe(tap((language: string) => {
          this.calendarDataHandlerService.setDaysName(this.getDaysNames(language));
          this.calendarDataHandlerService.setMonthNames(this.getMonthsNames(language));
        })),
      this.calendarDataHandlerService.getSelectedYear(),
      this.calendarDataHandlerService.getSelectedMonth()
    ).subscribe(([language, actualYear, actualMonth]: [string, number, number]) => {
      const month: IMonth = this.mapMonths({
        range: {year: actualYear, startMonth: actualMonth},
        currentDate: moment().format(CALENDARCONSTANTS.FORMAT.CLASIC_FORMAT),
        language,
      });

      this.calendarDataHandlerService.addMonthToYear(month);
      this.calendarDataHandlerService.setCurrentMonth(month);
    });

    this.calendarDataHandlerService.getCurrentMonth()
      .subscribe((month: IMonth) => {
        this.getUpdatedCalendarByUserData(month);
      });
  }

  getUpdatedCalendarByUserData(month: IMonth) {
    const userDataForThisMonth: IDictionary<IUserDataDay> = this.calendarDataHandlerService.getUserDataValueByMonthAndYear(
      month.year,
      month.monthNumberInYear,
    );
    let mergedCalendarWithData: IMonthWithValues = month;
    // const userDataFromPreviousMonth: IDictionary<IUserDataDay> = this.calendarDataHandlerService.getUserDataValueByDaysRange(
    //   month.year,
    //   month.monthNumberInYear,
    //   {start: 'x', end: 'x'}
    // );

    if(!isEmpty(userDataForThisMonth)) {
      mergedCalendarWithData = this.updateCalendarWithData(month, month.monthNumberInYear, userDataForThisMonth);
    }

    this.calendarDataHandlerService.setCurrentMonthWithValues(mergedCalendarWithData);
  }

  @MemoizeObject()
  updateCalendarWithData(month: IMonth, monthNumber: number, data: IDictionary<IUserDataDay>): IMonthWithValues {
    const updatedMonth: IMonthWithValues = cloneDeep(month) as IMonthWithValues;

    forEach(data, (value: IUserDataDay, numberOfDay: number) => {
      const foundIndex: number = findIndex(updatedMonth.days, {date: {month: monthNumber, year: month.year, day: toNumber(numberOfDay)}})

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
          index: `${calculatedDate.year}-${calculatedDate.month}-${numberOfDaysInMonth - i}`,
          name: momentDay.format(CALENDARCONSTANTS.FORMAT.DISPLAY),
          month: calculatedDate.month,
          year: calculatedDate.year,
          moment: momentDay,
          isActive: false,
          isCurrent: currentDateMoment.diff(momentDay, 'days') === 0,
          isDisabled: true,
          isFromPreviousMonth: true,
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
        index: `${config.year}-${config.monthNumber}-${i}`,
        moment: momentDay,
        name: momentDay.format(CALENDARCONSTANTS.FORMAT.DISPLAY),
        month: config.monthNumber,
        formatted,
        year: config.year,
        isActive: false,
        isCurrent: currentDateMoment.diff(momentDay, 'days') === 0,
        isDisabled: false,
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
          index: `${calculatedDate.year}-${calculatedDate.month}-${i}`,
          name: momentDay.format(CALENDARCONSTANTS.FORMAT.DISPLAY),
          month: calculatedDate.month,
          year: calculatedDate.year,
          isActive: false,
          moment: momentDay,
          isCurrent: currentDateMoment.diff(momentDay, 'days') === 0,
          isDisabled: true,
          isFromNextMonths: true,
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
}
