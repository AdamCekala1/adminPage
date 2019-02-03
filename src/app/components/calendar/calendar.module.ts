import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { MatCardModule, MatSelectModule } from '@angular/material';
import { FilterModule } from '../filter/filter.module';
import { CalendarContentComponent } from './calendar-content/calendar-content.component';
import { SharedModule } from '../../shared/shared.module';
import { CalendarCriteriaSelectorComponent } from './calendar-content/calendar-criteria-selector/calendar-criteria-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FilterModule,
    MatSelectModule,
    MatCardModule,
    SharedModule,
  ],
  declarations: [
    CalendarComponent,
    CalendarContentComponent,
    CalendarCriteriaSelectorComponent
  ]
})
export class CalendarModule { }
