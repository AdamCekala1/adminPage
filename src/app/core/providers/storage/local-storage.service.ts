import { Injectable } from '@angular/core';
import {Calories, UserDetails, UserTrainings} from "../../../components/calculator-calories/calculator-calories.interface";

@Injectable()
export class LocalStorageService {
  static setUserDetails(value: UserDetails) {
    localStorage.setItem('currentUser', JSON.stringify(value));
  }

  static getUserDetails(): UserDetails {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  static setUserTrainings(value: UserTrainings) {
    localStorage.setItem('userTrainings', JSON.stringify(value));
  }

  static getUserTrainings(): UserTrainings {
    return JSON.parse(localStorage.getItem('userTrainings'));
  }

  static setCalories(value: Calories) {
    localStorage.setItem('calories', JSON.stringify(value));
  }

  static getCalories(): Calories {
    return JSON.parse(localStorage.getItem('calories'));
  }
}
