import { Injectable } from '@angular/core';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import * as moment from 'moment';
import { clone, cloneDeep, isNumber, find, findIndex, get, merge, set } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { IMonth } from '../shared/calendar.interface';
import { SelectDayMode } from '../shared/select-day-mode.enum';
import { IStorageCalendar } from '../shared/storage.interface';
import { StorageCalendarKey } from '../shared/storage-keys.enums';

// TODO: create storage, reduce lineis of code

@Injectable({
  providedIn: 'root'
})
export class StorageCalendar {
  private storage: IStorageCalendar = {
    [StorageCalendarKey.DATA_SET]: new BehaviorSubject([]),
    [StorageCalendarKey.SELECTED_DATA_SET]: new BehaviorSubject(0),
    [StorageCalendarKey.SELECT_DAY_MODE]: new BehaviorSubject(SelectDayMode.DOUBLE),
    [StorageCalendarKey.USER_INPUT_DATA]: new BehaviorSubject({}),
    [StorageCalendarKey.RANGE_DAYS]: new BehaviorSubject(null),
    [StorageCalendarKey.CURRENT_MONTH]: new BehaviorSubject(null),
    [StorageCalendarKey.CURRENT_MONTH_WITH_VALUES]: new BehaviorSubject(null),
    [StorageCalendarKey.YEARS]: new BehaviorSubject({}),
    [StorageCalendarKey.SELECTED_YEAR]: new BehaviorSubject(moment().year()),
    [StorageCalendarKey.SELECTED_MONTH]: new BehaviorSubject(moment().month()),
    [StorageCalendarKey.DAYS_NAMES]: new BehaviorSubject([]),
    [StorageCalendarKey.MONTH_NAMES]: new BehaviorSubject([]),
  };

  getFromStorage<T>(key: StorageCalendarKey): BehaviorSubject<T | any> {
    return this.storage[key];
  }

  getValueFromStorage<T>(key: StorageCalendarKey): T | any {
    return this.getFromStorage<BehaviorSubject<T>>(key).getValue();
  }

  setToStorage<T>(key: StorageCalendarKey, value: T | any) {
    this.getFromStorage<BehaviorSubject<T>>(key).next(value);
  }

  updateCurrentMonth(month: IMonth) {
    return this.setToStorage(StorageCalendarKey.CURRENT_MONTH, merge(this.getValueFromStorage(StorageCalendarKey.CURRENT_MONTH), month));
  }

  addMonthToYear(month: IMonth) {
    const actualYearsData: IDictionary<IMonth[]> = this.getValueFromStorage(StorageCalendarKey.YEARS);
    const foundMonthIndex: number = findIndex(actualYearsData[month.year], {monthNumberInYear: month.monthNumberInYear});

    if (!actualYearsData[month.year]) {
      set(actualYearsData, [month.year], [month]);
    } else {
      if (foundMonthIndex > -1) {
        actualYearsData[month.year][foundMonthIndex] = month;
      } else {
        actualYearsData[month.year].push(month);
      }
    }

    this.setToStorage(StorageCalendarKey.YEARS, actualYearsData);
  }
}
