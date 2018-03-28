import { forEach } from 'lodash';
import { Injectable } from '@angular/core';
import { chain } from 'lodash';

import { CalculatorInformation, Calories, IntensityDetails } from './calculator-calories.interface';
import { CONSTANTS } from '../../shared/constants';
import { ActivityType } from '../../shared/enums/calculator-calories-form.enums';

@Injectable()
export class CalculatorCaloriesService {
  calculateKcal({age, weigth, height, gymTraining, aerobicTraining, buildType, isMen}: CalculatorInformation ): Calories {
    const bmr: number = this.calculateBMR(age, weigth, height, isMen);
    const teaAero: number = aerobicTraining ? this.calculateDailyTEA(aerobicTraining, ActivityType.AERO) : 0;
    const teaGym: number = gymTraining ? this.calculateDailyTEA(gymTraining, ActivityType.GYM, bmr) : 0;
    const neat: number  =  CONSTANTS.bodyType.kcal[buildType];
    const sumCalories: number = bmr + teaAero + teaGym + neat;
    const tef: number = 0.1 * sumCalories;

    return {
        all: sumCalories + tef,
        bmr,
        teaAero,
        teaGym,
        neat,
        tef
    };
  }

  private calculateBMR(age: number, weigth: number, height: number, isMen: boolean): number {
    const addedKcal: number = isMen ? 5 : -161;

    return 9.99 * weigth + (6.25 * height) - (4.92 * age) + addedKcal;
  }

  private calculateDailyTEA(trainings: IntensityDetails[], activityType: ActivityType, bmr: number = 0): number {
    return chain(trainings)
      .map((training: IntensityDetails) => this.calculateCaloriesPerTraining(training, activityType, bmr))
      .sum()
      .value();
  }

  private calculateCaloriesPerTraining(training: IntensityDetails, activityType: ActivityType, bmr: number): number {
    const kcalPerMinute: number = CONSTANTS.KCAL.PER_MINUTE[activityType][training.intensity];
    const periodReadable: number = CONSTANTS.periodsReadable.readableNumber[training.period];
    let kcalAdditional: number = CONSTANTS.KCAL.ADDITIONAL[activityType][training.intensity];

    if (activityType === ActivityType.GYM) {
      kcalAdditional *= bmr / 100;
    }

    return (training.time * kcalPerMinute + kcalAdditional) / periodReadable;
  }
}
