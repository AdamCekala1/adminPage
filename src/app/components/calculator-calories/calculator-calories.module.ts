import { NgModule } from '@angular/core';
import { CalculatorCaloriesComponent } from './calculator-calories.component';

import { SharedModule } from '../../shared/shared.module';
import { CalculatorCaloriesFormComponent } from './calculator-calories-form/calculator-calories-form.component';
import { CalculatorCaloriesService } from './calculator-calories.service';
import { CalculatorCaloriesFormTrainingComponent } from './calculator-calories-form/calculator-calories-form-training/calculator-calories-form-training.component';
import { CalculatorCaloriesDisplayComponent } from './calculator-calories-display/calories-calculator-display.component';
import { CalculatorCaloriesFormPersonalComponent } from './calculator-calories-form/calculator-calories-form-personal/calculator-calories-form-personal.component';
import { CalculatorCaloriesDescriptionComponent } from './calculator-calories-description/calculator-calories-description.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculatorCaloriesComponent,
    CalculatorCaloriesFormComponent,
    CalculatorCaloriesFormTrainingComponent,
    CalculatorCaloriesDisplayComponent,
    CalculatorCaloriesFormPersonalComponent,
    CalculatorCaloriesDescriptionComponent
  ],
  providers: [CalculatorCaloriesService],
  exports: [CalculatorCaloriesComponent]
})
export class CalculatorCaloriesModule { }
