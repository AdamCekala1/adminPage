import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { debounce } from 'lodash';

import { UtilsService } from '../../core/providers/utils/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isOnTop: boolean = true;
  readonly menu: {key: string, id: string}[] = [
    {key: 'About me', id: 'about-me'},
    {key: 'Technology', id: 'about-me'},
    {key: 'CV', id: 'about-me'},
    {key: 'Social Media', id: 'about-me'},
  ];

  constructor(private ngZone: NgZone,
              private changeDetectorRef: ChangeDetectorRef) {}

  redirectTo(id: string) {
    UtilsService.scroll(id);
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => {
        const newValue: boolean = window.pageYOffset < 400;

        if(newValue !== this.isOnTop) {
          this.isOnTop = newValue;

          this.changeDetectorRef.detectChanges();
        }
      });
    });
  }
}
