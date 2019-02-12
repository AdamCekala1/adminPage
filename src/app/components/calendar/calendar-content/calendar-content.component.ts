import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { forEach, get } from 'lodash';
import { CalendarDataHandlerService } from '../providers/calendar-data-handler.service';
import { takeUntil } from 'rxjs/operators';
import { IDay, IMonthWithValues, ISelectedDays } from '../shared/calendar.interface';
import { CalendarService } from '../providers/calendar.service';
import { CalendarDaysActionsService } from '../providers/calendar-days-actions.service';

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
              private calendarDaysActionService: CalendarDaysActionsService,
              private changeDetectorRef: ChangeDetectorRef,
              private calendarDataHandlerService: CalendarDataHandlerService) {
  }

  setAsActive(day: IDay) {
    if(!day.isDisabled) {
      this.calendarDaysActionService.setActiveDay(day);
    }
  }

  ngOnInit() {
    combineLatest(
      this.calendarDataHandlerService.getCurrentMonthWithValues(),
      this.calendarDataHandlerService.getRangeDays(),
    ).pipe(takeUntil(this.onDestroy))
      .subscribe(([month, selectedDays]: [IMonthWithValues, ISelectedDays]) => {
        if(month && selectedDays) {
          const days: IDay[] = this.calendarService.getDaysWithSelectedFlags(
            selectedDays,
            month.days,
            this.calendarDataHandlerService.getSelectDayMode()
          );

          month.days = days;
        }

        this.month = month;

        this.changeDetectorRef.detectChanges();
    });

    this.calendarDataHandlerService.getDaysName()
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
