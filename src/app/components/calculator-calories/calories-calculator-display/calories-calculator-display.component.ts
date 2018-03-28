import { Component, Input } from '@angular/core';

import { Calories } from '../calculator-calories.interface';

@Component({
  selector: 'app-calories-calculator-display',
  templateUrl: './calories-calculator-display.component.html',
  styleUrls: ['./calories-calculator-display.component.scss']
})
export class CaloriesCalculatorDisplayComponent {
  @Input() allCalories: Calories;
}
