import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cloneDeep } from 'lodash';

import './rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
