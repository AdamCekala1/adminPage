import { Component, OnDestroy, OnInit } from '@angular/core';
import { Calories } from './calculator-calories.interface';

@Component({
  selector: 'app-calculator-calories',
  templateUrl: './calculator-calories.component.html',
  styleUrls: ['./calculator-calories.component.scss']
})
export class CalculatorCaloriesComponent implements OnDestroy {
    allCalories: Calories;

    constructor() {
        console.log('xd')
    }

    setCalories(data: Calories) {
        this.allCalories = data;
    }

    ngOnDestroy() {
        console.log('destroy this shit');
    }
}
