import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IFilter } from './shared/filter.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from './filter.service';
import { IDictionary } from '../../shared/interfaces/utilis.interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterComponent {
  @Input('filters') set setFilters(filters: IFilter[]) {
    console.log('filters', filters)
    if(this.form) {
      this.updateForm(filters);
    } else {
      this.createForm(filters);
    }
  }
  @Input() activeFilterName: string;
  @Input() isSubmitDisplayed: boolean = true;
  @Output() onSubmit: EventEmitter<IDictionary<any>> = new EventEmitter();
  @Output() onActiveInput: EventEmitter<IFilter> = new EventEmitter();
  filters: IFilter[] = [];
  form: FormGroup;

  constructor(private filterService: FilterService, private formBuilder: FormBuilder) { }

  handleActiveInput(filter: IFilter) {
    // this.activeFilterName = filter.name;

    this.onActiveInput.emit(filter);
  }

  submit() {
    this.onSubmit.emit(this.form.value);
  }

  private updateForm(filters: IFilter[]) {
    this.filters = this.filterService.getUpdatedFilters(this.filters, filters);
    this.form = this.filterService.updateFormValues(this.form, this.filters);
  }

  private createForm(filters: IFilter[]) {
    this.filters = filters;
    this.form = this.formBuilder.group(this.filterService.mapConfigToForm(filters));
  }
}

/*

const filtrMock = [
  {
    name: 'month',
    type: FilterType.SELECT,
    initValue: 'luty',
    required: true,
    icon: 'fa-home',
    description: 'Wybierz miesic',
    values: ['Styczen', 'luty', 'marzec'],
  }, {
    name: 'year',
    initValue: 1990,
    type: FilterType.SELECT,
    nullOption: {
      canBeNull: true,
      textToClear: 'Wyzeruj'
    },
    description: 'Wybierz rok',
    values: [1990, 2000, 2001],
  }, {
    name: 'search',
    initValue: 1990,
    type: FilterType.TEXT,
    description: 'Wpisz fraze',
  }, {
    name: 'month',
    type: FilterType.SELECT,
    initValue: 'luty',
    icon: 'fa-plane',
    required: true,
    description: 'Wybierz miesic',
    values: ['Styczen', 'luty', 'marzec'],
  }, {
    name: 'year',
    initValue: 1990,
    type: FilterType.SELECT,
    description: 'Wybierz rok',
    values: [1990, 2000, 2001],
  }, {
    name: 'search',
    initValue: 1990,
    type: FilterType.TEXT,
    description: 'Wpisz fraze',
  }
];

 */
