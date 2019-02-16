import { Injectable } from '@angular/core';
import { get, merge } from 'lodash';
import { StorageCalendar } from './storage-calendar.service';
import { IDay, ISelectedDays } from '../shared/calendar.interface';
import { SelectDayType } from '../shared/select-day-type.enum';
import { SelectDayMode } from '../shared/select-day-mode.enum';
import { MemoizeObject } from 'memoize-object-decorator';
import { StorageCalendarKey } from '../shared/storage-keys.enums';

@Injectable({
  providedIn: 'root'
})
export class DaysActionsService {

  constructor(private storageCalendar: StorageCalendar) {
  }

  setActiveDay(day: IDay) {
    const selectedRange: ISelectedDays = this.storageCalendar.getValueFromStorage(StorageCalendarKey.RANGE_DAYS) || {};
    const mode: SelectDayMode = this.storageCalendar.getValueFromStorage(StorageCalendarKey.SELECT_DAY_MODE);
    const newSelectedRange: ISelectedDays = this.getSelectedRange(day, selectedRange, mode);

    this.storageCalendar.setToStorage(StorageCalendarKey.RANGE_DAYS, newSelectedRange);

    if (day.isPrev || day.isAfter) {
      this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_YEAR, day.date.year);
      this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_MONTH, day.date.month);
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
