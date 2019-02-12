import { Injectable } from '@angular/core';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import * as moment from 'moment';
import { clone, cloneDeep, find, findIndex, get, merge, set } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import {
  IDate,
  IDayWithValues,
  IMonth,
  IMonthShort,
  IMonthWithValues,
  ISelectedDays,
  IUserDataDay,
  IUserDataInput
} from '../shared/calendar.interface';
import { SelectDayMode } from '../shared/select-day-mode.enum';

const mockUserValue = {
  2019: {
    0: {
      28: {
        title: 'some title',
        values: [{color: 'blue', value: 'jakis test'}],
      },
      31: {
        values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
      },
    },
    1: {
      1: {
        values: [{color: 'red', value: 'Some text'}, {color: 'blue', value: 'xxxx'}],
        description: 'some description',
        title: 'some title',
      },
      4: {
        values: [{color: 'blue', value: 'jakis test'}],
      },
      13: {
        values: [{color: 'red', value: 'co my tu mamy?'}],
        description: 'some description',
      },
      22: {
        title: 'some title',
      },
      26: {
        values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
      },
    },
    2: {
      1: {
        title: 'some title',
        values: [{color: 'blue', value: 'jakis test'}],
      },
      2: {
        values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
      },
    },
  }
};

// TODO: create storage, reduce lineis of code

export enum StorageCalendarKey {
  SELECT_DAY_MODE,
  USER_INPUT_DATA,
  RANGE_DAYS,
  CURRENT_MONTH,
  CURRENT_MONTH_WITH_VALUES,
  YEARS,
  SELECTED_YEAR,
  SELECTED_MONTH,
  DAYS_NAMES,
  MONTH_NAMES,
}

export interface IStorageCalendar {
  [StorageCalendarKey.SELECT_DAY_MODE]: BehaviorSubject<SelectDayMode>;
  [StorageCalendarKey.USER_INPUT_DATA]: BehaviorSubject<IUserDataInput>;
  [StorageCalendarKey.RANGE_DAYS]: BehaviorSubject<ISelectedDays>;
  [StorageCalendarKey.CURRENT_MONTH]: BehaviorSubject<IMonth>;
  [StorageCalendarKey.CURRENT_MONTH_WITH_VALUES]: BehaviorSubject<IMonthWithValues>;
  [StorageCalendarKey.YEARS]: BehaviorSubject<IDictionary<IMonth[]>>;
  [StorageCalendarKey.SELECTED_YEAR]: BehaviorSubject<number>;
  [StorageCalendarKey.SELECTED_MONTH]: BehaviorSubject<number>;
  [StorageCalendarKey.DAYS_NAMES]: BehaviorSubject<string[]>;
  [StorageCalendarKey.MONTH_NAMES]: BehaviorSubject<IMonthShort[]>;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarDataHandlerService {
  private storage: IStorageCalendar = {
    [StorageCalendarKey.SELECT_DAY_MODE]: new BehaviorSubject(SelectDayMode.DOUBLE),
    [StorageCalendarKey.USER_INPUT_DATA]: new BehaviorSubject(mockUserValue),
    [StorageCalendarKey.RANGE_DAYS]: new BehaviorSubject(null),
    [StorageCalendarKey.CURRENT_MONTH]: new BehaviorSubject(null),
    [StorageCalendarKey.CURRENT_MONTH_WITH_VALUES]: new BehaviorSubject(null),
    [StorageCalendarKey.YEARS]: new BehaviorSubject({}),
    [StorageCalendarKey.SELECTED_YEAR]: new BehaviorSubject(moment().year()),
    [StorageCalendarKey.SELECTED_MONTH]: new BehaviorSubject(moment().month()),
    [StorageCalendarKey.DAYS_NAMES]: new BehaviorSubject([]),
    [StorageCalendarKey.MONTH_NAMES]: new BehaviorSubject([]),
  };


  // private selectDayMode: SelectDayMode = SelectDayMode.DOUBLE;
  private rangeDays: BehaviorSubject<ISelectedDays> = new BehaviorSubject(null);
  private currentMonth: BehaviorSubject<IMonth> = new BehaviorSubject(null);
  private currentMonthWithValues: BehaviorSubject<IMonthWithValues> = new BehaviorSubject(null);
  private years: BehaviorSubject<IDictionary<IMonth[]>> = new BehaviorSubject({});
  private selectedYear: BehaviorSubject<number> = new BehaviorSubject(moment().year());
  private selectedMonth: BehaviorSubject<number> = new BehaviorSubject(moment().month());
  private daysNames: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private monthNames: BehaviorSubject<IMonthShort[]> = new BehaviorSubject([]);

  getFromStorage<T>(key: StorageCalendarKey): BehaviorSubject<T | any> {
    return this.storage[key];
  }

  getValueFromStorage<T>(key: StorageCalendarKey): T | any {
    return this.getFromStorage<BehaviorSubject<T>>(key).getValue();
  }

  setToStorage<T>(key: StorageCalendarKey, value: T | any) {
    this.getFromStorage<BehaviorSubject<T>>(key).next(value);
  }

  setSelectDayMode(value: SelectDayMode) {
    this.setToStorage(StorageCalendarKey.SELECT_DAY_MODE, value);
  }

  getSelectDayMode(): SelectDayMode {
    return this.getValueFromStorage(StorageCalendarKey.SELECT_DAY_MODE);
  }

  getUserData(): BehaviorSubject<IUserDataInput> {
    return this.getFromStorage(StorageCalendarKey.USER_INPUT_DATA);
  }

  getUserDataValue(): IUserDataInput {
    return this.getValueFromStorage(StorageCalendarKey.USER_INPUT_DATA);
  }

  getUserDataValueByMonthAndYear(year: number, month: number): IDictionary<IUserDataDay> {
    const userData: IUserDataInput = this.getUserDataValue();

    return get(userData, `[${year}][${month}]`, {});
  }

  setUserData(data: IUserDataInput) {
    this.setToStorage(StorageCalendarKey.USER_INPUT_DATA, data);
  }

  updateUserData({day, month, year}: IDate, data: IUserDataDay) {
    const actualData: IUserDataInput = this.getUserDataValue() || {};
    const actualDataDay: IDayWithValues = get(actualData, `[${year}][${month}][${day}]`);

    if(actualDataDay) {
      actualData[year][month][day] = merge({}, actualDataDay, data);
    } else {
      set(actualData, `[${year}][${month}][${day}]`, data);
    }

    this.getUserData().next(actualData);
  }

  getMonthNames(): BehaviorSubject<IMonthShort[]> {
    return this.monthNames;
  }

  setMonthNames(months: IMonthShort[]) {
    this.getMonthNames().next(months);
  }

  getMonthNamesValue(): IMonthShort[] {
    return this.getMonthNames().getValue();
  }

  getCurrentMonth(): BehaviorSubject<IMonth> {
    return this.currentMonth;
  }

  getCurrentMonthValue(): IMonth {
    return this.getCurrentMonth().getValue();
  }

  setCurrentMonth(month: IMonth) {
    return this.getCurrentMonth().next(month);
  }

  getCurrentMonthWithValues(): BehaviorSubject<IMonthWithValues> {
    return this.currentMonthWithValues;
  }

  getCurrentMonthWithValuesValue(): IMonthWithValues {
    return this.getCurrentMonthWithValues().getValue();
  }

  setCurrentMonthWithValues(month: IMonthWithValues) {
    return this.getCurrentMonthWithValues().next(month);
  }

  getRangeDays(): BehaviorSubject<ISelectedDays> {
    return this.getFromStorage(StorageCalendarKey.RANGE_DAYS);
  }

  getRangedDaysValue(): ISelectedDays {
    return this.getRangeDays().getValue();
  }

  setRangedDays(selectedDays: ISelectedDays) {
    return this.setToStorage(StorageCalendarKey.RANGE_DAYS, selectedDays);
  }

  updateCurrentMonth(month: IMonth) {
    return this.setCurrentMonth(merge(this.getCurrentMonthValue(), month));
  }

  getYears(): BehaviorSubject<IDictionary<IMonth[]>> {
    return this.years;
  }

  getYearsValue(): IDictionary<IMonth[]> {
    return this.getYears().getValue();
  }

  setYear(months: IMonth[]) {
    const actualYearsData: IDictionary<IMonth[]> = this.getYearsValue();

    this.getYears().next(merge({}, actualYearsData, {[months[0].year]: months}));
  }

  addMonthToYear(month: IMonth) {
    const actualYearsData: IDictionary<IMonth[]> = this.getYearsValue();
    const foundMonthIndex: number = findIndex(actualYearsData[month.year], {monthNumberInYear: month.monthNumberInYear});

    if (!actualYearsData[month.year]) {
      set(actualYearsData, [month.year], [month]);
    } else {
      if (foundMonthIndex > -1) {
        actualYearsData[month.year][foundMonthIndex] = month;
      } else {
        actualYearsData[month.year].push(month);
      }
    }

    this.getYears().next(actualYearsData);
  }

  getSelectedYear(): BehaviorSubject<number> {
    return this.selectedYear;
  }

  getSelectedYearValue(): number {
    return this.getSelectedYear().getValue();
  }

  setSelectedYear(newSelected: number) {
    this.getSelectedYear().next(newSelected);
  }

  getSelectedMonth(): BehaviorSubject<number> {
    return this.selectedMonth;
  }

  getSelectedMonthValue(): number {
    return this.getSelectedMonth().getValue();
  }

  setSelectedMonth(newSelected: number) {
    this.getSelectedMonth().next(newSelected);
  }

  getDaysName(): BehaviorSubject<string[]> {
    return this.daysNames;
  }

  getDaysNameValue(): string[] {
    return this.getDaysName().getValue();
  }

  setDaysName(names: string[]) {
    this.getDaysName().next(names);
  }
}
