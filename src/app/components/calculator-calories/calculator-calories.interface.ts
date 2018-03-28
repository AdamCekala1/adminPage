import { bodyType, intensityType, periodType } from '../../shared/enums/calculator-calories-form.enums';

export interface IntensityDetails {
  time: number;
  period: periodType;
  intensity?: intensityType;
}

export interface CalculatorInformation extends UserTrainings, UserDetails {
  calories?: Calories;
}

export interface UserDetails {
  isMen: boolean;
  age: number;
  weigth: number;
  height: number;
  buildType: bodyType;
}

export interface UserTrainings {
  aerobicTraining: IntensityDetails[];
  gymTraining: IntensityDetails[];
}

export interface Calories {
  all: number;
  bmr: number;
  neat: number;
  teaAero: number;
  teaGym: number;
  tef: number;
}
