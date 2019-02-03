import { Injectable } from '@angular/core';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import * as moment from 'moment';
import { cloneDeep, find, findIndex, get, merge, set } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IDay, IMonth, IMonthShort, ISelectedDays } from '../shared/calendar.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarDataHandlerService {
  private rangeDays: BehaviorSubject<ISelectedDays> = new BehaviorSubject(null);
  private currentMonth: BehaviorSubject<IMonth> = new BehaviorSubject(null);
  private years: BehaviorSubject<IDictionary<IMonth[]>> = new BehaviorSubject({});
  private selectedYear: BehaviorSubject<number> = new BehaviorSubject(moment().year());
  private selectedMonth: BehaviorSubject<number> = new BehaviorSubject(moment().month());
  private daysNames: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private monthNames: BehaviorSubject<IMonthShort[]> = new BehaviorSubject([]);

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
    const foundMonthIndex: number = findIndex(actualYearsData[month.year], {numberInYear: month.numberInYear});

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
