import { Injectable } from '@angular/core';
import { get, merge, set, isNumber } from 'lodash';

import { StorageCalendar } from './storage-calendar.service';
import { IDate, IDayWithValues, IUserDataDay, IUserDataInput } from '../shared/calendar.interface';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import { combineLatest } from 'rxjs';
import { StorageCalendarKey } from '../shared/storage-keys.enums';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private storageCalendar: StorageCalendar) {
    combineLatest(
      this.storageCalendar.getFromStorage(StorageCalendarKey.DATA_SET),
      this.storageCalendar.getFromStorage(StorageCalendarKey.SELECTED_DATA_SET),
    )
      .subscribe(([data, selectedSet]: [IUserDataInput[], number]) => {
        if(data.length && isNumber(selectedSet)) {
          this.storageCalendar.setToStorage(StorageCalendarKey.USER_INPUT_DATA, get(data, `[${selectedSet}]`, {}));
        }
      });
  }

  updateUserData({day, month, year}: IDate, data: IUserDataDay) {
    const actualData: IUserDataInput = this.storageCalendar.getValueFromStorage(StorageCalendarKey.USER_INPUT_DATA) || {};
    const actualDataDay: IDayWithValues = get(actualData, `[${year}][${month}][${day}]`);

    if(actualDataDay) {
      actualData[year][month][day] = merge({}, actualDataDay, data);
    } else {
      set(actualData, `[${year}][${month}][${day}]`, data);
    }

    this.storageCalendar.setToStorage(StorageCalendarKey.USER_INPUT_DATA, actualData);
  }

  getUserDataValueByMonthAndYear(year: number, month: number): IDictionary<IUserDataDay> {
    const userData: IUserDataInput = this.storageCalendar.getValueFromStorage(StorageCalendarKey.USER_INPUT_DATA);

    return get(userData, `[${year}][${month}]`, {});
  }
}
