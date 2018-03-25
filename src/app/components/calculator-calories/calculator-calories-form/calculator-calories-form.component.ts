import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CalculatorInformation, Calories, IntensityDetails, UserTrainings } from '../calculator-calories.interface';
import { bodyType } from '../../../shared/enums/calculator-calories-form.enums';
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
    bodyTypesStringArray: string[] = [];
    userTrainings: UserTrainings = {
        aerobicTraining: [],
        gymTraining: []
    };
    readonly bodyType = bodyType;
    readonly bodyTypeReadable = CONSTANTS.bodyType.readableString;
    @Output() onCalculate: EventEmitter<Calories> = new EventEmitter();

    constructor(private calculatorService: CalculatorCaloriesService,
                private formBuilder: FormBuilder,
                private utilsService: UtilsService) {
    }

    addActivity(data: IntensityDetails, name: string) {
        this.userTrainings[name].push(data);
    }

    setCalories() {
        const calculatorFormValue: CalculatorInformation = this.calculatorForm.value;

        if (calculatorFormValue.weigth > 1 && calculatorFormValue.height > 1 && calculatorFormValue.age > 1) {
            this.onCalculate.emit(this.calculatorService.calculateKcal({
              ...this.userTrainings,
              ...calculatorFormValue
            }));
        } else {
            // .error('Uzupełnij dane by wykonać obliczenia !');
        }
    }

    setControlValue(controlName: string, value: string) {
        this.calculatorForm.get(controlName).setValue(value);
    }

    getControlValue(name: string): string {
        return this.calculatorForm.get(name).value;
    }

    ngOnInit() {
        this.bodyTypesStringArray = this.utilsService.enumToKeysArray(bodyType);

        this.initForm();
    }

    private initForm() {
      this.calculatorForm = this.formBuilder.group({
        isMen: true,
        weigth: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
        age: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
        height: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
        buildType: [bodyType.ENDO, [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      });
    }
}
