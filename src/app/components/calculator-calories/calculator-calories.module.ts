import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorCaloriesComponent } from './calculator-calories.component';

import { SharedModule } from '../../shared/shared.module';
import { CalculatorCaloriesFormComponent } from './calculator-calories-form/calculator-calories-form.component';
import { CalculatorCaloriesService } from './calculator-calories.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CalculatorCaloriesComponent,
    CalculatorCaloriesFormComponent
  ],
    providers: [CalculatorCaloriesService],
  exports: [CalculatorCaloriesComponent]
})
export class CalculatorCaloriesModule { }
