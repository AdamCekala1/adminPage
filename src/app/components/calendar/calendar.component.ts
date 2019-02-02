import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarService, IDay, IMonth } from './providers/calendar.service';
import * as moment from 'moment';
import { get, set } from 'lodash';

import { CalendarDataHandlerService } from './providers/calendar-data-handler.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDictionary } from '../../shared/interfaces/utilis.interfaces';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  month: IMonth;
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
    this.calendarDataHandlerService.getCurrentMonth()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((month: IMonth) => this.month = month);
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
