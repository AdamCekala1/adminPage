import {Component} from "@angular/core";
import { Calories } from './calculator-calories.interface';
import {LocalStorageService} from "../../core/providers/storage/local-storage.service";

@Component({
  selector: 'app-calculator-calories',
  templateUrl: './calculator-calories.component.html',
  styleUrls: ['./calculator-calories.component.scss']
})
export class CalculatorCaloriesComponent {
    allCalories: Calories = LocalStorageService.getCalories();

    setCalories(data: Calories) {
        LocalStorageService.setCalories(data);
        this.allCalories = data;
    }
}

