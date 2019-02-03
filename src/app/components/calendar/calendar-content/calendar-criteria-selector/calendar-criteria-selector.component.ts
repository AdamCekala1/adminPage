import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarDataHandlerService } from '../../providers/calendar-data-handler.service';
import { find } from 'lodash';
import { combineLatest } from 'rxjs';
import { IMonthShort } from '../../shared/calendar.interface';

@Component({
  selector: 'app-calendar-criteria-selector',
  templateUrl: './calendar-criteria-selector.component.html',
  styleUrls: ['./calendar-criteria-selector.component.scss']
})
export class CalendarCriteriaSelectorComponent implements OnInit {
  @ViewChild('selectMonth') selectMonth;
  monthsNames: IMonthShort[] = [];
  activeMonth: IMonthShort;
  constructor(private calendarDataHandlerService: CalendarDataHandlerService) { }

  ngOnInit() {
    combineLatest(
      this.calendarDataHandlerService.getMonthNames(),
      this.calendarDataHandlerService.getSelectedMonth(),
    )
      .subscribe(([monthsNames, activeMonth]: [IMonthShort[], number]) => {
        this.monthsNames = monthsNames;
        this.activeMonth = find(monthsNames, {numberInYear: activeMonth});
      });
  }

  setMonth(month: IMonthShort) {
    this.calendarDataHandlerService.setSelectedMonth(month.numberInYear);
  }

  openSelectMonth() {
    this.selectMonth.open();
  }
}
