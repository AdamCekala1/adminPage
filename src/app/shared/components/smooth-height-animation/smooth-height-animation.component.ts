import {ElementRef, HostBinding, Component, Input, OnChanges, ViewChild} from '@angular/core';

import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-smooth-height-animation',
  templateUrl: './smooth-height-animation.component.html',
  styleUrls: ['./smooth-height-animation.component.scss'],
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition('* <=> *', [
        style({height: '{{startHeight}}px', opacity: 0}),
        animate('.5s ease'),
      ], {params: {startHeight: 0}})
    ])
  ]
})
export class SmoothHeightAnimationComponent implements OnChanges {
  @Input()
  trigger: string;

  startHeight: number;

  constructor(private element: ElementRef) {}

  @HostBinding('@grow') get grow() {
    return {value: this.trigger, params: {startHeight: this.startHeight}};
  }

  setStartHeight(){
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges(){
    this.setStartHeight();
  }
}
