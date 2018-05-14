import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { widtBreakpoints } from '../../../shared/enums/width-breakpoints.enum';

@Injectable()
export class BreakpointsService {
  private widthName: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private observableMedia: ObservableMedia) {
    observableMedia.subscribe((media: MediaChange) => this.widthName.next(media.mqAlias));
  }

  getWidthName(): Observable<string> {
    return this.widthName;
  }

  getWithNameValue(): string {
    return this.widthName.getValue();
  }

  isSmall(): boolean {
    return this.isExtraSmall() || widtBreakpoints[this.getWithNameValue()] === widtBreakpoints.sm;
  }

  isExtraSmall(): boolean {
    return widtBreakpoints[this.getWithNameValue()] === widtBreakpoints.xs;
  }
}
