import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from './components/components.module';
import {CoreModule} from './core/core.module';
import {routes} from './app.routing';
import {CalculatorCaloriesModule} from './components/calculator-calories/calculator-calories.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalculatorCaloriesModule,
    RouterModule.forRoot(routes),
    CoreModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
