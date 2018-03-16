import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
      CommonModule,
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpModule,
      RouterModule

  ],
  exports: [
      CommonModule,
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpModule,
      RouterModule
  ],
  declarations: []
})
export class SharedModule { }
