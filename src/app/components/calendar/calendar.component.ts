import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { clone, cloneDeep, findIndex, get, isEqual, set, toNumber } from 'lodash';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { FilterType } from '../filter/shared/filter-type.enum';
import { LanguageService } from './providers/language.service';
import { StorageCalendar } from './providers/storage-calendar.service';
import { ISelectedDays, IUserDataInput } from './shared/calendar.interface';
import { StorageCalendarKey } from './shared/storage-keys.enums';
import { IFilter } from '../filter/shared/filter.interface';
import { SelectDayMode } from './shared/select-day-mode.enum';
import { SelectDayType } from './shared/select-day-type.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input('language') set setLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

  @Input('dataSet') set setDataSet(dataSet: IUserDataInput[]) {
    this.storageCalendar.setToStorage(StorageCalendarKey.DATA_SET, dataSet);
  }

  @Input('activeSet') set setActiveSet(activeSet: number) {
    this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_DATA_SET, activeSet);
  }

  @Input('calendarMode') set setMode(mode: SelectDayMode) {
    this.activeMode = mode;
    this.storageCalendar.setToStorage(StorageCalendarKey.SELECT_DAY_MODE, mode);
  }

  @Input() displayCalendar: boolean = true;
  @Input() displayFilters: boolean = true;
  @Input('activeInput') activeFilter: string | CalendarFilterNames = CalendarFilterNames.STARD.toString();
  filters: IFilter[] = filtrMock;
  activeMode: SelectDayMode;
  readonly selectDayMode = SelectDayMode;
  private range: ISelectedDays;
  private onDestroy: Subject<boolean> = new Subject<boolean>();

  constructor(private languageService: LanguageService,
              private storageCalendar: StorageCalendar) {
  }

  setOtherActiveDataSet(filter: IFilter) {
    this.activeFilter = filter.name;
    this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_DATA_SET, toNumber(filter.name));
  }

  ngOnInit() {
    this.storageCalendar.getFromStorage(StorageCalendarKey.SELECT_DAY_MODE)
      .pipe(takeUntil(this.onDestroy), switchMap((mode: SelectDayMode) => {
        if (mode === SelectDayMode.HALF_DOUBLE) {
          return this.storageCalendar.getFromStorage(StorageCalendarKey.RANGE_DAYS);
        }

        return of(null);
      })).subscribe((range: ISelectedDays) => {
        if (range) {
          if(this.filters[this.activeFilter] && range[this.activeFilter]) {
            const filters: IFilter[] = cloneDeep(this.filters);
            const filter: IFilter = this.filters[this.activeFilter];

            filter.value = range[this.activeFilter].formatted;

            filters[this.activeFilter] = filter;
            this.filters = filters;
          }

          if (get(this.range, 'start.index') !== range[SelectDayType.START].index) {
            this.activeFilter = CalendarFilterNames.END;
            this.storageCalendar.setToStorage(StorageCalendarKey.SELECTED_DATA_SET, toNumber(CalendarFilterNames.END));
          }

          this.range = cloneDeep(range);
        }
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.onDestroy.unsubscribe();
  }
}

export enum CalendarFilterNames {
  STARD, END
}

const filtrMock = [
  {
    name: CalendarFilterNames.STARD.toString(),
    type: FilterType.SELECT,
    icon: 'fa-calendar',
    placeholder: '...',
    description: 'Wybierz pierwszą datę',
    readonly: true,
  }, {
    name: CalendarFilterNames.END.toString(),
    type: FilterType.SELECT,
    icon: 'fa-calendar',
    placeholder: '...',
    description: 'Wybierz drugą datę',
    readonly: true,
  }
];
