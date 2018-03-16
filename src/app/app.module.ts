import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// TIM --------------------------------------------------------------------------------------------------
import { DashboardComponent } from './TIM_EXTRA_COMPONENTS/dashboard/dashboard.component';
import { UserProfileComponent } from './TIM_EXTRA_COMPONENTS/user-profile/user-profile.component';
import { TableListComponent } from './TIM_EXTRA_COMPONENTS/table-list/table-list.component';
import { TypographyComponent } from './TIM_EXTRA_COMPONENTS/typography/typography.component';
import { IconsComponent } from './TIM_EXTRA_COMPONENTS/icons/icons.component';
import { MapsComponent } from './TIM_EXTRA_COMPONENTS/maps/maps.component';
import { NotificationsComponent } from './TIM_EXTRA_COMPONENTS/notifications/notifications.component';
import { UpgradeComponent } from './TIM_EXTRA_COMPONENTS/upgrade/upgrade.component';
import { CalculatorCaloriesModule } from './components/calculator-calories/calculator-calories.module';
// ___ --------------------------------------------------------------------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,

  ],
  imports: [
      CalculatorCaloriesModule,
      RouterModule.forRoot(routes),
      CoreModule,
      ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
