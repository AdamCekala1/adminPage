import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from './providers/http/http.service';
import { UtilsService } from './providers/utils/utils.service';
import {BreakpointsService} from './providers/breakpoints/breakpoints.service';
import {CustomBreakPointsProvider} from './providers/breakpoints/breakpoints';

@NgModule({
  providers: [
    HttpService,
    UtilsService,
    BreakpointsService,
    CustomBreakPointsProvider
  ],
  declarations: []
})
export class CoreModule { }
