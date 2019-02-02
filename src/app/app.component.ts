import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cloneDeep } from 'lodash';

import './rxjs';
import { FilterType } from './components/filter/shared/filter-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  filters = filtrMock;

  changeFilter() {
    this.filters = cloneDeep(filtrMock2) as any;
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
    nullOption: {
      canBeNull: true,
      textToClear: 'Wyzeruj'
    },
    description: 'Wybierz miesiąc',
    values: [1990, 2000, 2001],
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
  // }, {
  //   name: 'year3',
  //   value: 1990,
  //   type: FilterType.SELECT,
  //   nullOption: {
  //     canBeNull: true,
  //     textToClear: 'Wyzeruj'
  //   },
  //   description: 'Wybierz rok',
  //   values: [1990, 2000, 2001],
  // }, {
  //   name: 'year4',
  //   value: 1990,
  //   type: FilterType.SELECT,
  //   nullOption: {
  //     canBeNull: true,
  //     textToClear: 'Wyzeruj'
  //   },
  //   description: 'Wybierz rok',
  //   values: [1990, 2000, 2001],
  // }, {
  //   name: 'search',
  //   value: 1990,
  //   type: FilterType.TEXT,
  //   description: 'Wpisz fraze',
  // }, {
  //   name: 'month2',
  //   type: FilterType.SELECT,
  //   value: 'luty',
  //   icon: 'fa-plane',
  //   required: true,
  //   description: 'Wybierz miesic',
  //   values: ['Styczen', 'luty', 'marzec'],
  // }, {
  //   name: 'year43',
  //   value: 1990,
  //   type: FilterType.SELECT,
  //   description: 'Wybierz rok',
  //   values: [1990, 2000, 2001],
  // }, {
  //   name: 'search234',
  //   value: 1990,
  //   type: FilterType.TEXT,
  //   description: 'Wpisz fraze',
  // }
];


const filtrMock2 = [
  {
    name: 'month',
    type: FilterType.SELECT,
    value: 'lutyxx',
  }, {
    name: 'year',
    description: 'Wybierz rok',
    values: [1920, 20200, 2001],
  }, {
    name: 'search',
    value: 1990,
    type: FilterType.TEXT,
    description: 'Wpisz fraze',
  }
]

