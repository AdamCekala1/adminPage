import { Injectable } from '@angular/core';
import { clone, map, times } from 'lodash';
import * as moment from 'moment';
import { CALENDARCONSTANTS } from '../calendar.contants';
import { MemoizeObject } from 'memoize-object-decorator';
import { CalendarDataHandlerService } from './calendar-data-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private calendarDataHandlerService: CalendarDataHandlerService) {
    this.calendarDataHandlerService.getSelectedYear().subscribe((actualYear) => {
      const months: IMonth[] = this.mapMonths({year: actualYear}, moment().format());

      this.calendarDataHandlerService.setYear(months);

      if(!this.calendarDataHandlerService.getDaysNameValue().length) {
        this.calendarDataHandlerService.setDaysName(this.getDaysNames(months[0].days));
      }
    });
  }

  @MemoizeObject()
  getDaysNames(days: IDay[]): string[] {
    return map(days.slice(0, 7), (day: IDay) => day.moment.format(CALENDARCONSTANTS.FORMAT.ONLYDAY));
  }

  @MemoizeObject()
  mapMonths(range: IMapMonthsRange, currentDate: string): IMonth[] {
    const endMonth: number = range.endMonth || 12;
    const startMonth: number = range.startMonth ? clone(range.startMonth) : 0;
    const currentDateMoment: moment.Moment = moment(currentDate);
    let actualNumberOfMonth: number = startMonth;

    return times(endMonth - startMonth, () => {
      const monthMoment: moment.Moment = moment([range.year, actualNumberOfMonth]);
      const newMonth: IMonth = {
        year: range.year,
        id: `${range.year}-${actualNumberOfMonth}`,
        name: monthMoment.format('MMMM'),
        isCurrent: currentDateMoment.diff(monthMoment, 'month') === 0,
        isActive: false,
        days: this.getMappedDays(actualNumberOfMonth, range.year, currentDate)
      };

      actualNumberOfMonth += 1;

      return newMonth;
    });
  }

  @MemoizeObject()
  private getMappedDays(monthNumber: number, year: number, currentDate: string): IDay[] {
    const daysInMonth: number = moment([year, monthNumber]).daysInMonth();
    const currentDateMoment: moment.Moment = moment(currentDate).startOf('day');
    const days: IDay[] = [];
    const missingDays: {begin: number, end: number} = this.getNumberOfMissingDays(monthNumber, year);

    if(missingDays.begin) {
      times(missingDays.begin, (i: number) => {
        const calculatedDate: {year: number, month: number} = this.calculateMonthAndYear(year, monthNumber - 1);
        const momentDay: moment.Moment = moment([calculatedDate.year, calculatedDate.month, i + 1]);

        days.push({
          index: `${calculatedDate.year}-${calculatedDate.month}-${i}`,
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
      const momentDay: moment.Moment = moment([year, monthNumber, i + 1]);
      const formatted: string = momentDay.format('YYYY-MM-DD');

      days.push({
        index: `${year}-${monthNumber}-${i}`,
        moment: momentDay,
        name: momentDay.format(CALENDARCONSTANTS.FORMAT.DISPLAY),
        month: monthNumber,
        formatted,
        year,
        isActive: false,
        isCurrent: currentDateMoment.diff(momentDay, 'days') === 0,
        isDisabled: false,
      });
    });

    if(missingDays.end) {
      times(missingDays.end, (i: number) => {
        const calculatedDate: {year: number, month: number} = this.calculateMonthAndYear(year, monthNumber + 1);
        const momentDay: moment.Moment = moment([calculatedDate.year, calculatedDate.month, i + 1]);

        days.push({
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
  private calculateMonthAndYear(year, month): {year: number, month: number} {
    if(month < 12 && month >= 0) {
      return {
        year,
        month,
      };
    } else if(month < 0) {
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
  private getNumberOfMissingDays(monthNumber: number, year: number): {begin: number, end: number} {
    const daysInMonth: number = moment([year, monthNumber]).daysInMonth();

    return {
      begin: moment([year, monthNumber, 1]).weekday() - 1,
      end: 7 - moment([year, monthNumber, daysInMonth]).weekday(),
    };
  }
}

export interface IMapMonthsRange {
  year: number;
  startMonth?: number;
  endMonth?: number;
}

export interface ICompleteCalendarDay {
  year: number;
  month: number;
  isBeginning: number;
  numberOfDays: number;
}

export interface IMonth {
  id: string;
  name: string;
  year: number;
  isActive: boolean;
  isCurrent: boolean;
  days: IDay[];
}

export interface ISelectedDays {
  start: IDay;
  end: IDay;
}

export interface IDay {
  index: string;
  formatted?: string;
  name: string;
  moment: moment.Moment;
  month: number;
  year: number;
  isActive: boolean;
  isCurrent: boolean;
  isDisabled: boolean;
  isFromPreviousMonth?: boolean;
  isFromNextMonths?: boolean;
}
