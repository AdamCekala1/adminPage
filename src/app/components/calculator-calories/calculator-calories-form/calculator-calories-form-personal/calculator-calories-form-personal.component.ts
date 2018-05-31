import { debounceTime } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bodyType } from '../../../../shared/enums/calculator-calories-form.enums';
import { CONSTANTS } from '../../../../shared/constants';
import { UserDetails } from '../../calculator-calories.interface';
import { UtilsService } from '../../../../core/providers/utils/utils.service';
import { CalculatorCaloriesService } from '../../calculator-calories.service';

@Component({
  selector: 'app-calculator-calories-form-personal',
  templateUrl: './calculator-calories-form-personal.component.html',
  styleUrls: ['./calculator-calories-form-personal.component.scss']
})
export class CalculatorCaloriesFormPersonalComponent implements OnInit {
  personalForm: FormGroup;
  @Input() userDetails: UserDetails;
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
    this.personalForm = this.formBuilder.group({
      sex: ['', [Validators.required]],
      weigth: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      age: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      height: ['', [Validators.required, Validators.pattern(CONSTANTS.REGEX.NUMBER_ONLY)]],
      buildType: [bodyType.ENDO, Validators.required]
    });
  }

  private watchFormUpdate() {
    this.personalForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.setPersonalDetails();
    });
  }
}
