import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {forOwn, keys} from 'lodash';

import {Calories} from '../calculator-calories.interface';

@Component({
  selector: 'app-calories-calculator-display',
  templateUrl: './calculator-calories-display.component.html',
  styleUrls: ['./calculator-calories-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorCaloriesDisplayComponent {
  @Input() set allCalories(allCalories: Calories) {
    this.setTableData(allCalories);
  }

  keys: string[] = [];
  dataSource: { key: string, value: string }[] = [];

  private setTableData(allCalories: Calories) {
    this.dataSource = [];

    forOwn(allCalories, (value: string, key: string) => value ? this.dataSource.push({key, value}) : null);

    this.keys = this.dataSource.length ? keys(this.dataSource[0]) : [];
  }
}
