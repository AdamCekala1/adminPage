import { debounceTime } from 'rxjs/operators';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash';

import { bodyType } from '../../../../shared/enums/calculator-calories-form.enums';
import { CONSTANTS } from '../../../../shared/constants';
import { UserDetails } from '../../calculator-calories.interface';
import { UtilsService } from '../../../../core/providers/utils/utils.service';
import { CalculatorCaloriesService } from '../../calculator-calories.service';
import {LocalStorageService} from "../../../../core/providers/storage/local-storage.service";

@Component({
  selector: 'app-calculator-calories-form-personal',
  templateUrl: './calculator-calories-form-personal.component.html',
  styleUrls: ['./calculator-calories-form-personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorCaloriesFormPersonalComponent implements OnInit {
  personalForm: FormGroup;
  @Output() onChange: EventEmitter<UserDetails> = new EventEmitter();

  constructor(private calculatorService: CalculatorCaloriesService,
              private formBuilder: FormBuilder,
              private utilsService: UtilsService) {
  }

  setPersonalDetails() {
    if (this.personalForm.valid) {
      this.onChange.emit(this.personalForm.value);
    } else {
      this.onChange.emit(null);
    }
  }

  ngOnInit() {
    this.initForm();
    this.watchFormUpdate();
  }

  private initForm() {
    const userDetails: UserDetails = LocalStorageService.getUserDetails();

    this.personalForm = this.formBuilder.group({
      sex: [get(userDetails, 'sex', ''), [Validators.required]],
      weigth: [get(userDetails, 'weigth', ''), [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      age: [get(userDetails, 'age', ''), [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      height: [get(userDetails, 'height', ''), [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      buildType: [get(userDetails, 'buildType', bodyType.ENDO), Validators.required]
    });

    this.setPersonalDetails();
  }

  private watchFormUpdate() {
    this.personalForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.setPersonalDetails();
    });
  }
}
