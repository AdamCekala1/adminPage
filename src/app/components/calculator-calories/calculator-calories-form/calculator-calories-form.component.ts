import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import { get, remove, uniqueId } from 'lodash';

import { Calories, IntensityDetails, UserDetails, UserTrainings } from '../calculator-calories.interface';
import { CalculatorCaloriesService } from '../calculator-calories.service';
import {LocalStorageService} from "../../../core/providers/storage/local-storage.service";

@Component({
  selector: 'app-calculator-calories-form',
  templateUrl: './calculator-calories-form.component.html',
  styleUrls: ['./calculator-calories-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorCaloriesFormComponent {
  userTrainings: UserTrainings;
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
    console.log(this.userDetails)
    if (this.userDetails) {
        LocalStorageService.setUserDetails(this.userDetails);
        LocalStorageService.setUserTrainings(this.userTrainings);
        this.onCalculate.emit(this.calculatorService.calculateKcal({
          ...this.userTrainings,
          ...this.userDetails
        }));
    } else {
        // .error('Uzupełnij dane by wykonać obliczenia !');
    }
  }

  ngOnInit() {
    this.initUserTrainings();
  }

  private initUserTrainings() {
    const userTrainingsStorage: UserTrainings = LocalStorageService.getUserTrainings();

    this.userTrainings = {
      aerobicTraining: get(userTrainingsStorage, 'aerobicTraining', []),
      gymTraining: get(userTrainingsStorage, 'gymTraining', [])
    };
  }
}
