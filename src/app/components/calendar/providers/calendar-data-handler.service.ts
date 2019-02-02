import { Injectable } from '@angular/core';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import { IDay, IMonth, ISelectedDays } from './calendar.service';
import * as moment from 'moment';
import { get, merge } from 'lodash';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarDataHandlerService {
  private selectedDays: BehaviorSubject<ISelectedDays> = new BehaviorSubject(null);
  private currentMonth: BehaviorSubject<IMonth> = new BehaviorSubject(null);
  private years: BehaviorSubject<IDictionary<IMonth[]>> = new BehaviorSubject({});
  private selectedYear: BehaviorSubject<number> = new BehaviorSubject(moment().year());
  private selectedMonth: BehaviorSubject<number> = new BehaviorSubject(moment().month());
  private daysName: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor() {
    combineLatest(
      this.getSelectedYear(),
      this.getSelectedMonth(),
      this.getYears(),
    ).subscribe(([year, month, years]: [number, number, IDictionary<IMonth[]>]) => {
      this.setCurrentMonth(get(years, `[${year}][${month}]`, null));
    });
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

  getSelectedDays(): BehaviorSubject<ISelectedDays> {
    return this.selectedDays;
  }

  getSelectedDaysValue(): ISelectedDays {
    return this.getSelectedDays().getValue();
  }

  setSelectedDays(month: ISelectedDays) {
    return this.getSelectedDays().next(month);
  }

  selectDay(day: IDay, isStart: boolean = true) {
    return this.setSelectedDays(merge(this.getSelectedDaysValue(), {[isStart ? 'start' : 'end']: day}));
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
    return this.daysName;
  }

  getDaysNameValue(): string[] {
    return this.getDaysName().getValue();
  }

  setDaysName(names: string[]) {
    this.getDaysName().next(names);
  }
}
