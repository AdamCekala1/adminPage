import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InvalidInputDirective } from './directives/invalid-input.directive';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    InvalidInputDirective,
    BsDropdownModule,
    HttpModule,
    RouterModule
  ],
  declarations: [InvalidInputDirective]
})
export class SharedModule { }
