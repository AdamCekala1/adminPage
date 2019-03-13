import { Component, Input, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-animate-text',
  templateUrl: './animate-text.component.html',
  styleUrls: ['./animate-text.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(300, [
            animate('0.3s', style({ opacity: 0 }))
          ])
        ],  {optional: true}),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(300, [
            animate('0.3s', style({ opacity: 1 }))
          ])
        ],  {optional: true})
      ])
    ])
  ]
})
export class AnimateTextComponent implements OnInit {
  @Input() set value(value: string) {
    this.values = value.split(' ');

    console.log(this.values)
  }
  values: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
