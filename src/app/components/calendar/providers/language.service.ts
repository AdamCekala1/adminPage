import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language: BehaviorSubject<string> = new BehaviorSubject('en');

  constructor() {
    moment.locale(this.getLanguageValue());
  }

  getLanguage(): BehaviorSubject<string> {
    return this.language;
  }

  getLanguageValue(): string {
    return this.getLanguage().getValue();
  }

  setLanguage(value: string) {
    moment.locale(value);
    this.getLanguage().next(value);
  }
}
