import { Component, Input } from '@angular/core';
import { get, set } from 'lodash';

import { FilterType } from '../filter/shared/filter-type.enum';
import { LanguageService } from './providers/language.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input('language') set setLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
  filters = filtrMock;
  displayCalendar: boolean = true;

  constructor(private languageService: LanguageService) {
  }

  toggleDisplaySection() {
    this.displayCalendar = !this.displayCalendar;
  }

  setLocale() {
    this.languageService.setLanguage('pl-PL')
  }
}

const filtrMock = [
  {
    name: 'month',
    type: FilterType.TEXT,
    required: true,
    icon: 'fa-home',
    description: 'Wpisz szukaną fraze',
    placeholder: '...',

  }, {
    name: 'year',
    value: 1990,
    type: FilterType.SELECT,
    icon: 'fa-calendar',
    description: 'Wybierz miesiąc',
    readonly: true,
  }, {
    name: 'year2',
    value: 1990,
    icon: 'fa-calendar',
    type: FilterType.SELECT,
    nullOption: {
      canBeNull: true,
      textToClear: 'Wyzeruj'
    },
    description: 'Wybierz rok',
    values: [1990, 2000, 2001],
  }
]
