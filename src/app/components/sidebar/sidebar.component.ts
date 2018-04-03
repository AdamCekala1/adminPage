import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";

import {BreakpointsService} from "../../core/providers/breakpoints/breakpoints.service";
import { Bind } from "lodash-decorators";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: 'table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: 'typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: 'icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: 'maps', title: 'Maps',  icon: 'location_on', class: '' },
    { path: 'notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: 'user-profile', title: 'SOMETHING',  icon: 'person', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = ROUTES;
  isVisible: boolean;
  isDesktopMenu: boolean; // todo: implement

  constructor(private breakpointsService: BreakpointsService) {
  }

  toggleNavbar() {
    this.isVisible = !this.isVisible;
  }

  ngOnInit() {
    this.getWidthName().subscribe(this.handleWindowResize);
  }

  private getWidthName(): Observable<string> { // todo: unsubscribe
    return this.breakpointsService.getWidthName();
  }

  @Bind()
  private handleWindowResize() {
    if(this.breakpointsService.isSmall()) {
      this.isDesktopMenu = false;
    } else {
      this.isDesktopMenu = true;
    }
  }
}
