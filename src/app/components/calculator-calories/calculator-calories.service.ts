import { forEach } from 'lodash';
import { Injectable } from '@angular/core';

import { CalculatorInformation, Calories, IntensityDetails } from './calculator-calories.interface';
import { CONSTANTS } from '../../shared/constants';

@Injectable()
export class CalculatorCaloriesService {

    constructor() { }

    calculateKcal(data: CalculatorInformation ): Calories {
        const {age, weigth, height, gymTraining, aerobicTraining, builType, isMen} = data;
        const bmr: number = this.calculateBMR(age, weigth, height, isMen);
        const teaAero: number = this.calculateDailyAeroTEA(aerobicTraining);
        const teaGym: number = this.calculateDailyGymTEA(gymTraining, bmr);
        const neat: number  =  CONSTANTS.bodyType.kcal[builType];
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

    private calculateDailyAeroTEA(trainings: IntensityDetails[]): number {
        let allKcal: number = 0;
        let kcalPerMinute: number;
        let kcalAdditional: number;
        let periodReadable: number;

        forEach(trainings, (training: IntensityDetails) => {
            kcalPerMinute = CONSTANTS.KCAL.PER_MINUTE.AERO[training.intensity];
            kcalAdditional = CONSTANTS.KCAL.ADDITIONAL.AERO_KCAL[training.intensity];
            periodReadable = CONSTANTS.periodsReadable.readableNumber[training.period];

            allKcal += (training.time * kcalPerMinute + kcalAdditional) / periodReadable;
        });

        return allKcal;
    }

    private calculateDailyGymTEA(trainings: IntensityDetails[], bmr: number): number {
        let allKcal: number = 0;
        let kcalPerMinute: number;
        let kcalAdditional: number;
        let periodReadable: number;

        forEach(trainings, (training: IntensityDetails) => {
            kcalPerMinute = CONSTANTS.KCAL.PER_MINUTE.GYM[training.intensity];
            kcalAdditional = CONSTANTS.KCAL.ADDITIONAL.GYM_PERCENT[training.intensity];
            periodReadable = CONSTANTS.periodsReadable.readableNumber[training.period];

            allKcal += (training.time * kcalPerMinute + kcalAdditional * bmr / 100 ) / periodReadable;
        });

        return allKcal;
    }
}
