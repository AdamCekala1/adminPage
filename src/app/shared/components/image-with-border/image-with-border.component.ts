import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-with-border',
  templateUrl: './image-with-border.component.html',
  styleUrls: ['./image-with-border.component.scss']
})
export class ImageWithBorderComponent implements OnInit {
  @Input() backgroundColor: string;
  @Input() imgName: string;
  @Input() extraClasses: string;
  constructor() { }

  ngOnInit() {
  }

}
