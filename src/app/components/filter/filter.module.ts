import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { FilterContentComponent } from './filter-content/filter-content.component';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [FilterComponent, FilterContentComponent],
  exports: [FilterComponent],
})
export class FilterModule { }
