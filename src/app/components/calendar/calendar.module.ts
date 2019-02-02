import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { MatSelectModule } from '@angular/material';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  imports: [
    CommonModule,
    FilterModule,
    MatSelectModule,
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
