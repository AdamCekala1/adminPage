import {bodyType, intensityType, periodType, sexType} from "../../shared/enums/calculator-calories-form.enums";

export interface IntensityDetails {
  index: number;
  time: number;
  period: periodType;
  intensity?: intensityType;
}

export interface CalculatorInformation extends UserTrainings, UserDetails {
  calories?: Calories;
}

export interface UserDetails {
  sex: sexType;
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
