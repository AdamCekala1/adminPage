import * as moment from 'moment';

export interface IMapMonths {
  range: IMapMonthsRange;
  currentDate: string;
  language: string;
}

export interface IMapDays {
  monthNumber: number;
  year: number;
  currentDate: string;
  language: string;
}

export interface INumberOfMissingDaysConfig {
  monthNumber: number;
  year: number;
  language: string;
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

export interface IMonth extends IMonthShort {
  id: string;
  year: number;
  isActive: boolean;
  isCurrent: boolean;
  days: IDay[];
}

export interface ISelectedDays {
  start: IDay;
  end?: IDay;
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

export interface IMonthShort {
  name: string;
  numberInYear: number;
}
