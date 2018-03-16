import { bodyType, intensityType, periodType } from '../../shared/enums/calculator-calories-form.enums';

export interface IntensityDetails {
  time: number;
  period: periodType;
  intensity?: intensityType;
}

export interface CalculatorInformation {
  isMen: boolean;
  age: number;
  weigth: number;
  height: number;
  builType: bodyType;
  aerobicTraining: IntensityDetails[];
  gymTraining: IntensityDetails[];
  calories?: Calories;
}

export interface Calories {
  all: number;
  bmr: number;
  neat: number;
  teaAero: number;
  teaGym: number;
  tef: number;
}
