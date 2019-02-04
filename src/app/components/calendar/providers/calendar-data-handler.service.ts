import { Injectable } from '@angular/core';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import * as moment from 'moment';
import { cloneDeep, find, findIndex, get, merge, set } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  IDate,
  IDay, IDayValue,
  IDayWithValues,
  IMonth,
  IMonthShort,
  IMonthWithValues,
  ISelectedDays,
  IUserDataDay,
  IUserDataInput
} from '../shared/calendar.interface';

const mockUserValue = {
  2019: {
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
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class CalendarDataHandlerService {
  private userInputData: BehaviorSubject<IUserDataInput> = new BehaviorSubject(mockUserValue);
  private rangeDays: BehaviorSubject<ISelectedDays> = new BehaviorSubject(null);
  private currentMonth: BehaviorSubject<IMonth> = new BehaviorSubject(null);
  private currentMonthWithValues: BehaviorSubject<IMonthWithValues> = new BehaviorSubject(null);
  private years: BehaviorSubject<IDictionary<IMonth[]>> = new BehaviorSubject({});
  private selectedYear: BehaviorSubject<number> = new BehaviorSubject(moment().year());
  private selectedMonth: BehaviorSubject<number> = new BehaviorSubject(moment().month());
  private daysNames: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private monthNames: BehaviorSubject<IMonthShort[]> = new BehaviorSubject([]);

  getUserData(): BehaviorSubject<IUserDataInput> {
    return this.userInputData;
  }

  getUserDataValue(): IUserDataInput {
    return this.getUserData().getValue();
  }

  getUserDataValueByMonthAndYear(year: number, month: number): IDictionary<IUserDataDay> {
    const userData: IUserDataInput = this.getUserDataValue();

    return get(userData, `[${year}][${month}]`, {});
  }

  setUserData(data: IUserDataInput) {
    this.getUserData().next(data);
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
    return this.rangeDays;
  }

  getRangedDaysValue(): ISelectedDays {
    return this.getRangeDays().getValue();
  }

  setRangedDays(month: ISelectedDays) {
    return this.getRangeDays().next(month);
  }

  selectDay(day: IDay, isStart: boolean = true) {
    let selectedRange: ISelectedDays = cloneDeep(this.getRangedDaysValue());
    let isChanged: boolean = false;

    if (isStart && selectedRange.end && day.moment.isAfter(selectedRange.end.moment)) {
      selectedRange = {
        start: selectedRange.end,
        end: day,
      };

      isChanged = true;
    } else if (!isStart) {
      if (!selectedRange.start) {
        selectedRange = {
          start: day,
        };

        isChanged = true;
      } else if (day.moment.isBefore(selectedRange.start.moment)) {
        selectedRange = {
          start: day,
          end: selectedRange.start,
        };

        isChanged = true;
      }
    } else if (!isChanged) {
      selectedRange = merge({}, selectedRange, {[isStart ? 'start' : 'end']: day});
    }

    this.setRangedDays(selectedRange);
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
