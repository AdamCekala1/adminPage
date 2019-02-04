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

export type IMonthWithValues = IMonthGeneral<IDayWithValues>;

export type IMonth = IMonthGeneral<IDay>;

export interface IMonthGeneral<T> extends IMonthShort {
  id: string;
  year: number;
  isActive: boolean;
  isCurrent: boolean;
  days: T[];
}

export interface ISelectedDays {
  start: IDay;
  end?: IDay;
}

export interface IDay {
  date: IDate;
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

export interface IDayWithValues extends IDay {
  values?: IDayValue[];
  description?: string;
  title?: string;
}

export interface IDate {
  day: number;
  month: number;
  year: number;
}

/*

{
  2019: {
    1: {
      dayNumber: number;
      values?: IDayValue[];
      description?: string;
      title?: string;
    }
  }
}


 */

export interface IUserDataInput {
  [yearKey: number]: {
    [monthKey: number]: {
      [dayKey: number]: IUserDataDay
    };
  };
}

export interface IUserDataDay {
  values?: IDayValue[];
  description?: string;
  title?: string;
}


export interface IDayValue {
  color?: string;
  value: string;
}

export interface IMonthShort {
  name: string;
  monthNumberInYear: number;
}
