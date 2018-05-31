import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import { remove, uniqueId } from 'lodash';

import { Calories, IntensityDetails, UserDetails, UserTrainings } from '../calculator-calories.interface';
import { CalculatorCaloriesService } from '../calculator-calories.service';

@Component({
  selector: 'app-calculator-calories-form',
  templateUrl: './calculator-calories-form.component.html',
  styleUrls: ['./calculator-calories-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorCaloriesFormComponent {
  userTrainings: UserTrainings = {
      aerobicTraining: [],
      gymTraining: []
  };
  private userDetails: UserDetails;
  @Output() onCalculate: EventEmitter<Calories> = new EventEmitter();

  constructor(private calculatorService: CalculatorCaloriesService) {
  }

  setUserDetails(userDetails: UserDetails) {
    this.userDetails = userDetails;
    this.setCalories();
  }

  addActivity(data: IntensityDetails, name: string) {
    this.userTrainings[name].push({...data, index: uniqueId(name)});
    this.setCalories();
  }

  removeActivity(data: IntensityDetails, name: string) {
    remove(this.userTrainings[name], data);

    this.setCalories();
  }

  setCalories() {
    if (this.userDetails) {
        this.onCalculate.emit(this.calculatorService.calculateKcal({
          ...this.userTrainings,
          ...this.userDetails
        }));
    } else {
        // .error('Uzupełnij dane by wykonać obliczenia !');
    }
  }
}
