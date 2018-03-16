import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './TIM_EXTRA_COMPONENTS/dashboard/dashboard.component';
import { UserProfileComponent } from './TIM_EXTRA_COMPONENTS/user-profile/user-profile.component';
import { TableListComponent } from './TIM_EXTRA_COMPONENTS/table-list/table-list.component';
import { TypographyComponent } from './TIM_EXTRA_COMPONENTS/typography/typography.component';
import { IconsComponent } from './TIM_EXTRA_COMPONENTS/icons/icons.component';
import { MapsComponent } from './TIM_EXTRA_COMPONENTS/maps/maps.component';
import { NotificationsComponent } from './TIM_EXTRA_COMPONENTS/notifications/notifications.component';
import { UpgradeComponent } from './TIM_EXTRA_COMPONENTS/upgrade/upgrade.component';
import { CalculatorCaloriesComponent } from './components/calculator-calories/calculator-calories.component';

export const routes: Routes = [
    { path: 'dashboard',      component: CalculatorCaloriesComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];
