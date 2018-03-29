import { Routes } from '@angular/router';

import { CalculatorCaloriesComponent } from './components/calculator-calories/calculator-calories.component';

export const routes: Routes = [
    { path: 'dashboard',      component: CalculatorCaloriesComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];
