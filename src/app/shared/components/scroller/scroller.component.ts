import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent {
  @Input() text: string = 'scroll to xxx';
  @Input() elementId: string = 'about-me';

  scroll() {
    const element: HTMLElement = document.getElementById(this.elementId);

    if(element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }
}
