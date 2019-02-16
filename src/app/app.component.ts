import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cloneDeep } from 'lodash';

import './rxjs';
import { IUserDataInput } from './components/calendar/shared/calendar.interface';
import { StorageCalendar } from './components/calendar/providers/storage-calendar.service';
import { StorageCalendarKey } from './components/calendar/shared/storage-keys.enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  mockUserValue: IUserDataInput[] = mockUserValue;
  displayCalendar: boolean = true;
  lang: string = 'en';

  constructor(private storageCalendar: StorageCalendar) {
  }

  setLocale(value: string) {
    this.lang = value;
  }

  changeDataSet() {
    const selectedDataSet: number = this.storageCalendar.getValueFromStorage(StorageCalendarKey.SELECTED_DATA_SET);

    this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_DATA_SET, selectedDataSet === 0 ? 1 : 0);
  }
}

const mockUserValue = [
  {
    2019: {
      0: {
        28: {
          title: 'some title',
          values: [{color: 'blue', value: 'jakis test'}],
        },
        31: {
          values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
        },
      },
      1: {
        1: {
          values: [{color: 'red', value: 'Some text'}, {color: 'blue', value: 'xxxx'}],
          description: 'some description',
          title: 'some title',
        },
        4: {
          values: [{color: 'blue', value: 'jakis test'}],
        },
        13: {
          values: [{color: 'red', value: 'co my tu mamy?'}],
          description: 'some description',
        },
        22: {
          title: 'some title',
        },
        26: {
          values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
        },
      },
      2: {
        1: {
          title: 'some title',
          values: [{color: 'blue', value: 'jakis test'}],
        },
        2: {
          values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
        },
      },
    }
  },  {
    2019: {
      0: {
        28: {
          title: 'different title',
          values: [{color: 'red', value: 'jakis dddd'}],
        },
        30: {
          values: [{color: 'green', value: 'sss ipsum dsad'}, {color: 'yellow', value: 'jakis przyklad x'}],
        },
      },
      1: {
        2: {
          values: [{color: 'brown', value: 'Some asdasd'}, {color: 'blue', value: 'xxxx'}],
          description: 'some asdasdasd',
          title: 'some asdasdas',
        },
        4: {
          values: [{color: 'green', value: 'jakis sadasd'}],
        },
        17: {
          values: [{color: 'blue', value: 'co my tu mamy?'}],
          description: 'some description',
        },
        22: {
          title: 'some sadasd',
        },
        26: {
          values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
        },
      },
      2: {
        1: {
          title: 'some title',
          values: [{color: 'blue', value: 'jakis test'}],
        },
        2: {
          values: [{color: 'red', value: 'lorem ipsum ect'}, {color: 'blue', value: 'jakis przyklad'}],
        },
      },
    }
  },
];
