import { BehaviorSubject } from 'rxjs';
import { IMonth, IMonthShort, IMonthWithValues, ISelectedDays, IUserDataInput } from './calendar.interface';
import { SelectDayMode } from './select-day-mode.enum';
import { IDictionary } from '../../../shared/interfaces/utilis.interfaces';
import { StorageCalendarKey } from './storage-keys.enums';

export interface IStorageCalendar {
  [StorageCalendarKey.DATA_SET]: BehaviorSubject<IUserDataInput[]>;
  [StorageCalendarKey.SELECTED_DATA_SET]: BehaviorSubject<number>;
  [StorageCalendarKey.SELECT_DAY_MODE]: BehaviorSubject<SelectDayMode>;
  [StorageCalendarKey.USER_INPUT_DATA]: BehaviorSubject<IUserDataInput>;
  [StorageCalendarKey.RANGE_DAYS]: BehaviorSubject<ISelectedDays>;
  [StorageCalendarKey.CURRENT_MONTH]: BehaviorSubject<IMonth>;
  [StorageCalendarKey.CURRENT_MONTH_WITH_VALUES]: BehaviorSubject<IMonthWithValues>;
  [StorageCalendarKey.YEARS]: BehaviorSubject<IDictionary<IMonth[]>>;
  [StorageCalendarKey.SELECTED_YEAR]: BehaviorSubject<number>;
  [StorageCalendarKey.SELECTED_MONTH]: BehaviorSubject<number>;
  [StorageCalendarKey.DAYS_NAMES]: BehaviorSubject<string[]>;
  [StorageCalendarKey.MONTH_NAMES]: BehaviorSubject<IMonthShort[]>;
}
