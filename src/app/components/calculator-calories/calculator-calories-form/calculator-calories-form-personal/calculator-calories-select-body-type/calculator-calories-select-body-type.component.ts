import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {bodyType} from '../../../../../shared/enums/calculator-calories-form.enums';
import {ControlValueAccessorWrapper} from '../../../../../shared/classes/control-value-accessor-wrapper.class';

import {UtilsService} from '../../../../../core/providers/utils/utils.service';
import {CONSTANTS} from '../../../../../shared/constants';
import {IDictionary} from '../../../../../shared/interfaces/utilis.interfaces';

@Component({
  selector: 'app-calculator-calories-select-body-type',
  templateUrl: './calculator-calories-select-body-type.component.html',
  styleUrls: ['./calculator-calories-select-body-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CalculatorCaloriesSelectBodyTypeComponent,
    multi: true
  }]
})
export class CalculatorCaloriesSelectBodyTypeComponent extends ControlValueAccessorWrapper implements ControlValueAccessor, OnInit {
  slectedType: string;
  bodyTypesStringArray: string[] = [];
  tooltipText: IDictionary<string> = {
    [bodyType.ENDO]: 'Endomorfik ma masywną budowę ciała i grube kości.',
    [bodyType.MEZO]: 'Mezomorfik z muskularny typ budowy.',
    [bodyType.EKTO]: 'Ektomorficy to ludzie o drobnej budowie i małym obwodzie kości.',
  };
  readonly bodyType = bodyType;
  readonly bodyTypeReadable = CONSTANTS.bodyType.readableString;

  constructor(private utilsService: UtilsService) {
    super();
  }

  writeValue(value: string) {
    this.slectedType = value;
  }

  changeValue(value: bodyType) {
    this.writeValue(bodyType[value]);
    this.onChange(bodyType[value]);
  }

  ngOnInit() {
    this.bodyTypesStringArray = this.utilsService.enumToKeysArray(bodyType);
  }
}
