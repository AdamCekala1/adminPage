import { Injectable } from '@angular/core';
import { cloneDeep, get, merge } from 'lodash';
import { CalendarDataHandlerService } from './calendar-data-handler.service';
import { IDay, ISelectedDays } from '../shared/calendar.interface';
import { SelectDayType } from '../shared/select-day-type.enum';
import { SelectDayMode } from '../shared/select-day-mode.enum';
import { MemoizeObject } from 'memoize-object-decorator';

@Injectable({
  providedIn: 'root'
})
export class CalendarDaysActionsService {

  constructor(private calendarDataHandlerService: CalendarDataHandlerService) {
  }

  setActiveDay(day: IDay) {
    const selectedRange: ISelectedDays = cloneDeep(this.calendarDataHandlerService.getRangedDaysValue()) || {};
    const mode: SelectDayMode = this.calendarDataHandlerService.getSelectDayMode();
    const newSelectedRange: ISelectedDays = this.getSelectedRange(day, selectedRange, mode);

    this.calendarDataHandlerService.setRangedDays(newSelectedRange);

    if (day.isPrev || day.isAfter) {
      this.calendarDataHandlerService.setSelectedYear(day.date.year);
      this.calendarDataHandlerService.setSelectedMonth(day.date.month);
    }
  }

  @MemoizeObject()
  private getSelectedRange(day: IDay, selectedRange: ISelectedDays, mode: SelectDayMode): ISelectedDays {
    if (!get(selectedRange, SelectDayType.START) || mode === SelectDayMode.SINGLE) {
      day.selectDayType = SelectDayType.START;
      selectedRange[SelectDayType.START] = day;
    } else {
      if(mode === SelectDayMode.HALF_DOUBLE) {
        if (day.index > selectedRange[SelectDayType.START].index) {

          day.selectDayType = SelectDayType.END;
          selectedRange[SelectDayType.END] = day;
        }
      } else if(mode === SelectDayMode.DOUBLE) {
        if(!selectedRange[SelectDayType.END] && day.index < selectedRange[SelectDayType.START].index) {
          day.selectDayType = SelectDayType.START;
          selectedRange[SelectDayType.END] = selectedRange[SelectDayType.START];
          selectedRange[SelectDayType.START] = day;
        } else if (day.index > selectedRange[SelectDayType.START].index) {

          day.selectDayType = SelectDayType.END;
          selectedRange[SelectDayType.END] = day;
        } else {
          day.selectDayType = SelectDayType.START;
          selectedRange[SelectDayType.START] = day;
        }
      }
    }

    return selectedRange;
  }
}
