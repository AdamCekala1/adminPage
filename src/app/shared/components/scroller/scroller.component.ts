import { Component, Input } from '@angular/core';

import { UtilsService } from '../../../core/providers/utils/utils.service';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent {
  @Input() text: string = 'scroll to xxx';
  @Input() elementId: string = 'about-me';

  scroll() {
    UtilsService.scroll(this.elementId);
  }
}
