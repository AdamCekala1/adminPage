import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [HomeComponent, WelcomeComponent],
  exports: [HomeComponent],
})
export class HomeModule { }
