import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StorageCalendar } from '../../providers/storage-calendar.service';
import { find, times } from 'lodash';
import * as moment from 'moment';
import { combineLatest, Subject } from 'rxjs';
import { IMonthShort } from '../../shared/calendar.interface';
import { takeUntil } from 'rxjs/operators';
import { StorageCalendarKey } from '../../shared/storage-keys.enums';

@Component({
  selector: 'app-calendar-criteria-selector',
  templateUrl: './calendar-criteria-selector.component.html',
  styleUrls: ['./calendar-criteria-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCriteriaSelectorComponent implements OnInit, OnDestroy {
  @ViewChild('selectMonth') selectMonth;
  @ViewChild('selectYear') selectYear;
  years: number[] = [];
  monthsNames: IMonthShort[] = [];
  activeMonth: IMonthShort;
  activeYear: number;
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private storageCalendar: StorageCalendar,
              private changeDetectorRef: ChangeDetectorRef) { }

  setMonth(month: IMonthShort) {
    this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_MONTH, month.monthNumberInYear);
  }

  setYear(year: number) {
    this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_YEAR, year);
  }

  openSelectMonth() {
    this.selectMonth.open();
  }

  openSelectYear() {
    this.selectYear.open();
  }

  ngOnInit() {
    this.years = this.generateYears();
    combineLatest(
      this.storageCalendar.getFromStorage(StorageCalendarKey.MONTH_NAMES),
      this.storageCalendar.getFromStorage(StorageCalendarKey.SELECTED_MONTH),
      this.storageCalendar.getFromStorage(StorageCalendarKey.SELECTED_YEAR),
    )
      .pipe(takeUntil(this.onDestroy))
      .subscribe(([monthsNames, activeMonth, activeYear]: [IMonthShort[], number, number]) => {
        console.log([monthsNames, activeMonth, activeYear])
        this.monthsNames = monthsNames;
        this.activeYear = activeYear;
        this.activeMonth = find(monthsNames, {monthNumberInYear: activeMonth});
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }

  private generateYears(): number[] {
    const numberOfPreviousAndFutureYears: number = 5;
    const startYear: number = moment().year() - numberOfPreviousAndFutureYears;
    const years: number[] = [];

    times(2 * numberOfPreviousAndFutureYears, (i: number) => {
      years.push(startYear + i);
    });

    return years;
  }
}
