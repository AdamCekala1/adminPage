import { Routes } from '@angular/router';

import { CalculatorCaloriesComponent } from './components/calculator-calories/calculator-calories.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
    { path: 'dashboard',      component: CalendarComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];
