import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bodyType } from '../../../../shared/enums/calculator-calories-form.enums';
import { CONSTANTS } from '../../../../shared/constants';
import { Calories, UserDetails } from '../../calculator-calories.interface';
import { UtilsService } from '../../../../core/providers/utils/utils.service';
import { CalculatorCaloriesService } from '../../calculator-calories.service';

@Component({
  selector: 'app-calculator-calories-form-personal',
  templateUrl: './calculator-calories-form-personal.component.html',
  styleUrls: ['./calculator-calories-form-personal.component.scss']
})
export class CalculatorCaloriesFormPersonalComponent implements OnInit {
  personalForm: FormGroup;
  bodyTypesStringArray: string[] = [];
  readonly bodyType = bodyType;
  readonly bodyTypeReadable = CONSTANTS.bodyType.readableString;
  @Output() onChange: EventEmitter<UserDetails> = new EventEmitter();

  constructor(private calculatorService: CalculatorCaloriesService,
              private formBuilder: FormBuilder,
              private utilsService: UtilsService) {
  }

  // checkIsInvalid(name: string): boolean {
  //   if(name === 'age') {
  //     console.log(this.getControl(name))
  //     console.log(this.utilsService.checkInputIsInvalid(this.getControl(name)))
  //   }
  //   return this.utilsService.checkInputIsInvalid(this.getControl(name));
  // }

  setPersonalDetails() {
    if (this.personalForm.valid) {
      this.onChange.emit(this.personalForm.value);
    } else {
      this.onChange.emit(null);
    }
  }

  setControlValue(controlName: string, value: string) {
    this.personalForm.get(controlName).setValue(value);
  }

  getControlValue(name: string): string {
    return this.personalForm.get(name).value;
  }

  getControl(name: string): AbstractControl {
    return this.personalForm.get(name);
  }

  ngOnInit() {
    this.bodyTypesStringArray = this.utilsService.enumToKeysArray(bodyType);

    this.initForm();
    this.watchFormUpdate();
  }

  private initForm() {
    this.personalForm = this.formBuilder.group({
      isMen: true,
      weigth: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      age: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      height: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      buildType: [bodyType.ENDO, Validators.required]
    });
  }

  private watchFormUpdate() {
    // todo: unsubscribe
    this.personalForm.valueChanges.debounceTime(300).subscribe(() => {
      this.setPersonalDetails();
    });
  }
}
