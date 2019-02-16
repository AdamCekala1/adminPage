import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { forEach, get } from 'lodash';
import { StorageCalendar } from '../providers/storage-calendar.service';
import { takeUntil } from 'rxjs/operators';
import { IDay, IMonthWithValues, ISelectedDays } from '../shared/calendar.interface';
import { CalendarService } from '../providers/calendar.service';
import { DaysActionsService } from '../providers/days-actions.service';
import { StorageCalendarKey } from '../shared/storage-keys.enums';

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarContentComponent implements OnInit, OnDestroy {
  month: IMonthWithValues;
  daysName: string[] = [];
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private calendarService: CalendarService,
              private daysActionService: DaysActionsService,
              private changeDetectorRef: ChangeDetectorRef,
              private storageCalendar: StorageCalendar) {
  }

  setAsActive(day: IDay) {
    if(!day.isDisabled) {
      this.daysActionService.setActiveDay(day);
    }
  }

  ngOnInit() {
    combineLatest(
      this.storageCalendar.getFromStorage(StorageCalendarKey.CURRENT_MONTH_WITH_VALUES),
      this.storageCalendar.getFromStorage(StorageCalendarKey.RANGE_DAYS),
      this.storageCalendar.getFromStorage(StorageCalendarKey.SELECTED_DATA_SET),
    ).pipe(takeUntil(this.onDestroy))
      .subscribe(([month, selectedDays, dataSet]: [IMonthWithValues, ISelectedDays, number]) => {
        if(month && selectedDays) {
          const days: IDay[] = this.calendarService.getDaysWithSelectedFlags(
            selectedDays,
            month.days,
            dataSet,
            this.storageCalendar.getValueFromStorage(StorageCalendarKey.SELECT_DAY_MODE)
          );

          month.days = days;
        }

        this.month = month;

        this.changeDetectorRef.detectChanges();
    });

    this.storageCalendar.getFromStorage(StorageCalendarKey.DAYS_NAMES)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((days: string[]) => {
        this.daysName = days;

        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }
}
