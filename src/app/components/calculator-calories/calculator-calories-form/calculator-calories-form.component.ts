import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { cloneDeep, isNumber, toNumber } from 'lodash';

import { CalculatorInformation, Calories, IntensityDetails } from '../calculator-calories.interface';
import { bodyType, intensityType, periodType } from '../../../shared/enums/calculator-calories-form.enums';
import { UtilsService } from '../../../core/providers/utils/utils.service';
import { CalculatorCaloriesService } from '../calculator-calories.service';
import { CONSTANTS } from '../../../shared/constants';

@Component({
  selector: 'app-calculator-calories-form',
  templateUrl: './calculator-calories-form.component.html',
  styleUrls: ['./calculator-calories-form.component.scss']
})
export class CalculatorCaloriesFormComponent implements OnInit {
    calculatorForm: FormGroup;
    periodTypesStringArray: string[] = [];
    bodyTypesStringArray: string[] = [];
    intensityTypesStringArray: string[] = [];
    singleActivity: {aerobicTraining: IntensityDetails, gymTraining: IntensityDetails} = {
        aerobicTraining: {
            time: 0, period: periodType.DAY, intensity: intensityType.LIGHT
        },
        gymTraining: {
            time: 0, period: periodType.DAY
        }
    };
    userInformation: CalculatorInformation = {
        aerobicTraining: [],
        age: 0,
        builType: bodyType.ENDO,
        gymTraining: [],
        height: 0,
        isMen: true,
        weigth: 0,
    };
    @Output() onCalculate: EventEmitter<Calories> = new EventEmitter();

    constructor(private calculatorService: CalculatorCaloriesService,
                private formBuilder: FormBuilder,
                private utilsService: UtilsService) {
        console.log('xxx')
        // this.notificationsService.error('Uzupełnij dane by wykonać obliczenia !');
    }

    setCalories() {
        const {age, weigth, height, isMen} = this.calculatorForm.value;

        this.userInformation = {
            ...this.userInformation,
            ...{age, weigth, height, isMen}
        };

        if(weigth > 1 && height > 1 && age > 1) {
            this.onCalculate.emit(this.calculatorService.calculateKcal(this.userInformation));
        } else {
            // this.notificationsService.error('Uzupełnij dane by wykonać obliczenia !');
        }
    }

    readActivity(activity: IntensityDetails): string {
        return `${CONSTANTS.intensitTypeReadable[activity.intensity]}
    Czas: ${activity.time} ${CONSTANTS.periodsReadable.readableString[activity.period]}`;
    }

    checkIsValid(name: string): boolean {
        return this.calculatorForm.get(name).valid;
    }

    userBuildTypeClass(type: string): string {
        return this.userInformation.builType === bodyType[type] ? 'active' : '';
    }

    getBodyTypeReadable(type: string): string {
        return CONSTANTS.bodyType.readableString[bodyType[type]];
    }

    getPeriodReadable(type: string): string {
        return CONSTANTS.periodsReadable.readableString[periodType[type]];
    }

    getPeriodReadableActive(type: periodType): string {
        return CONSTANTS.periodsReadable.readableString[type];
    }

    getIntensityReadable(type: string): string {
        return CONSTANTS.intensitTypeReadable[intensityType[type]];
    }

    getIntensityReadableActive(type: intensityType): string {
        return CONSTANTS.intensitTypeReadable[type];
    }

    builTypeHandler(value: string) {
        this.userInformation.builType = bodyType[value];
    }

    addPeriod(type: string, activityName: string) {
        this.singleActivity[activityName].period = periodType[type];
    }

    addIntensity(type: string, activityName: string) {
        this.singleActivity[activityName].intensity = intensityType[type];
    }

    addAnotherActivity(name: string) {
        const readTime: number = toNumber(this.calculatorForm.get(name).value);

        if(readTime > 0) {
            this.singleActivity[name].time = readTime;
            this.userInformation[name].push(cloneDeep(this.singleActivity[name]));
        } else {
            // this.notificationsService.error('Nie możesz dodać aktywności z 0 czasem');
        }
    }

    ngOnInit() {
        this.periodTypesStringArray = this.utilsService.enumToKeysArray(periodType);
        this.bodyTypesStringArray = this.utilsService.enumToKeysArray(bodyType);
        this.intensityTypesStringArray = this.utilsService.enumToKeysArray(intensityType);

        this.calculatorForm = this.formBuilder.group({
            isMen: true,
            weigth: [1, [this.minValue(1), this.isNumberValidator()]],
            age: [1, [this.minValue(1), this.isNumberValidator()]],
            height: [1, [this.minValue(1), this.isNumberValidator()]],
            aerobicTraining: [0, [this.minValue(0), this.isNumberValidator()]],
            gymTraining: [0, [this.minValue(0), this.isNumberValidator()]]
        });
    }

    private minValue(min: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const isValid: boolean = control.value >= min;

            if (!isValid) {
                return {'isValid': false};
            } else {
                return null;
            }
        };
    }

    private isNumberValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const isValid: boolean  = isNumber(control.value);

            if(!isValid) {
                return {'isValid': false};
            } else {
                return null;
            }
        };
    }
}
