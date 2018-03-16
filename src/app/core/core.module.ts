import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './providers/http/http.service';
import { UtilsService } from './providers/utils/utils.service';

@NgModule({
    providers: [
        HttpService,
        UtilsService
    ],
  declarations: []
})
export class CoreModule { }
