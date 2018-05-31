import { Component } from '@angular/core';
import { Calories } from './calculator-calories.interface';

@Component({
  selector: 'app-calculator-calories',
  templateUrl: './calculator-calories.component.html',
  styleUrls: ['./calculator-calories.component.scss']
})
export class CalculatorCaloriesComponent {
    allCalories: Calories;

    setCalories(data: Calories) {
        console.log(this.allCalories)
        this.allCalories = data;
    }
}

