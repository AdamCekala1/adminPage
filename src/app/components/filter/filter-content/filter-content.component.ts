import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IFilter } from '../shared/filter.interface';
import { FilterType } from '../shared/filter-type.enum';
import { ControlValueAccessorWrapper } from '../../../shared/classes/control-value-accessor-wrapper.class';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-filter-content',
  templateUrl: './filter-content.component.html',
  styleUrls: ['./filter-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FilterContentComponent,
    multi: true,
  }],
})
export class FilterContentComponent extends ControlValueAccessorWrapper implements ControlValueAccessor {
  @Input() filter: IFilter;
  @ViewChild('select') select;
  actualValue: string | number = '';
  readonly filterType = FilterType;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  writeValue(value: string) {
    this.actualValue = value;
  }

  selectValue(value: string) {
    this.onChange(value);
    this.writeValue(value);
  }

  openSelect() {
    if(this.select) {
      this.select.open();
    }
  }
}
