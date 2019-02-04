import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarDataHandlerService } from '../providers/calendar-data-handler.service';
import { takeUntil } from 'rxjs/operators';
import { IDay, IMonthWithValues } from '../shared/calendar.interface';
import { CalendarService } from '../providers/calendar.service';

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.scss']
})
export class CalendarContentComponent implements OnInit, OnDestroy {
  month: IMonthWithValues;
  daysName: string[] = [];
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private calendarService: CalendarService,
              private calendarDataHandlerService: CalendarDataHandlerService) {
  }

  setAsActive(day: IDay) {
    // if(day.isFromNextMonths || day.isFromPreviousMonth) {
    //   this.days = this.calendarService.mapMonths({year: 2019}, moment().format())[day.month].days;
    // }
  }

  ngOnInit() {
    this.calendarDataHandlerService.getCurrentMonthWithValues()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((month: IMonthWithValues) => this.month = month);
    this.calendarDataHandlerService.getDaysName()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((days: string[]) => this.daysName = days);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }
}
