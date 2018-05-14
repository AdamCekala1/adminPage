import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InvalidInputDirective } from './directives/invalid-input.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatGridListModule, MatInputModule, MatRadioModule,
  MatSelectModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    FlexLayoutModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    InvalidInputDirective,
    HttpModule,
    RouterModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatGridListModule,
    MatCardModule
  ],
  declarations: [InvalidInputDirective]
})
export class SharedModule { }
