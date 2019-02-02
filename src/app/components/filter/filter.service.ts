import { Injectable } from '@angular/core';
import { IFilter } from './shared/filter.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { cloneDeep, findIndex, forEach, set } from 'lodash';
import { IDictionary } from '../../shared/interfaces/utilis.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private formBuilder: FormBuilder) {
  }

  mapConfigToForm(filters: IFilter[]): IDictionary<any> {
    const controls: IDictionary<any> = {};

    forEach(filters, (filter: IFilter) => {
      set(controls, filter.name, [filter.value, this.getControlValidators(filter)]);
    });

    return controls;
  }

  updateFormValues(form: FormGroup, filters: IFilter[]): FormGroup {
    forEach(filters, (filter: IFilter) => {
      const control: AbstractControl = form.get(filter.name);

      if(control) {
        if (filter.value) {
          control.setValue(filter.value);
        }

        control.clearValidators();
        control.setValidators(this.getControlValidators(filter));
      } else {
        form.addControl(filter.name, new FormControl(filter.value, this.getControlValidators(filter)));
      }
    });

    return form;
  }

  getUpdatedFilters(filters: IFilter[], newFilters: IFilter[]): IFilter[] {
    const changedFilters: IFilter[] = cloneDeep(filters);

    forEach(newFilters, (newFilter: IFilter) => {
      const foundFilterIndex: number = findIndex(changedFilters, {name: newFilter.name});

      if(foundFilterIndex > -1) {
        changedFilters[foundFilterIndex] = {...changedFilters[foundFilterIndex], ...newFilter};
      } else {
        changedFilters.push(newFilter);
      }
    });

    return changedFilters;
  }

  private getControlValidators(filter: IFilter): ValidatorFn[] {
    const controlValidators: ValidatorFn[] = [];

    if(filter.validators) {
      if(filter.validators.required) {
        controlValidators.push(Validators.required);
      }

      if(filter.validators.regex) {
        controlValidators.push(Validators.pattern(filter.validators.regex));
      }
    }

    return controlValidators;
  }
}
