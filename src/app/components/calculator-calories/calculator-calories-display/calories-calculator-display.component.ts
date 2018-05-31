import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

import { Calories } from '../calculator-calories.interface';

@Component({
  selector: 'app-calories-calculator-display',
  templateUrl: './calculator-calories-display.component.html',
  styleUrls: ['./calculator-calories-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorCaloriesDisplayComponent {
  @Input() allCalories: Calories;
}
