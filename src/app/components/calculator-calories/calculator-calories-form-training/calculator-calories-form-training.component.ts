import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { bodyType, intensityType, periodType } from '../../../shared/enums/calculator-calories-form.enums';
import { UtilsService } from '../../../core/providers/utils/utils.service';
import { IntensityDetails } from '../calculator-calories.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '../../../shared/constants';

@Component({
  selector: 'app-calculator-calories-form-training',
  templateUrl: './calculator-calories-form-training.component.html',
  styleUrls: ['./calculator-calories-form-training.component.scss']
})
export class CalculatorCaloriesFormTrainingComponent implements OnInit {
  activityform: FormGroup;
  periodTypesStringArray: string[] = [];
  intensityTypesStringArray: string[] = [];
  readonly intensityType = intensityType;
  readonly periodType = periodType;
  readonly periodsReadable = CONSTANTS.periodsReadable.readableString;
  readonly intensitTypeReadable = CONSTANTS.intensitTypeReadable;
  @Input() title: string;
  @Input() intensityDetails: IntensityDetails[] = [];
  @Output() onAddIntensity: EventEmitter<IntensityDetails> = new EventEmitter();

  constructor(private utilsService: UtilsService,
              private formBuilder: FormBuilder) { }

  addActivity() {
    if (this.activityform.valid) {
      this.onAddIntensity.emit(this.activityform.value);
    }
  }

  setControlValue(value: string, controlName: string) {
    this.activityform.get(controlName).setValue(value);
  }

  getFormValue(name: string): string {
    return this.activityform.get(name).value;
  }

  readActivity(activity: IntensityDetails): string {
    return `
        Zmęczenie: ${CONSTANTS.intensitTypeReadable[activity.intensity]} ---- 
        Czas: ${activity.time} (min) ---- 
        ${CONSTANTS.periodsReadable.readableString[activity.period]}`;
  }

  ngOnInit() {
    this.periodTypesStringArray = this.utilsService.enumToKeysArray(periodType);
    this.intensityTypesStringArray = this.utilsService.enumToKeysArray(intensityType);
    this.initForm();
  }

  private initForm() {
    this.activityform = this.formBuilder.group({
      time: ['', [Validators.min(1), Validators.required, Validators.pattern(/^\d+$/)]],
      period: [periodType.DAY, Validators.required],
      intensity: [intensityType.LIGHT, Validators.required]
    });
  }
}
