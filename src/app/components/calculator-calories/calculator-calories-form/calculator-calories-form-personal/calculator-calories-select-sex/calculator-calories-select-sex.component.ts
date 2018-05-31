import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {CONSTANTS} from "../../../../../shared/constants";
import {UtilsService} from "../../../../../core/providers/utils/utils.service";
import {bodyType, sexType} from "../../../../../shared/enums/calculator-calories-form.enums";
import {ControlValueAccessorWrapper} from "../../../../../shared/classes/control-value-accessor-wrapper.class";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-calculator-calories-select-sex',
  templateUrl: './calculator-calories-select-sex.component.html',
  styleUrls: ['./calculator-calories-select-sex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CalculatorCaloriesSelectSexComponent,
    multi: true
  }]
})
export class CalculatorCaloriesSelectSexComponent extends ControlValueAccessorWrapper implements ControlValueAccessor, OnInit {
  slectedType: string;
  sexTypesStringArray: string[] = [];
  readonly sexType = sexType;
  readonly sexTypeReadable = CONSTANTS.sexType.readableString;

  constructor(private utilsService: UtilsService) {
    super();
  }

  writeValue(value: string) {
    this.slectedType = value;
  }

  changeValue(value: sexType) {
    this.writeValue(sexType[value]);
    this.onChange(sexType[value]);
  }

  ngOnInit() {
    this.sexTypesStringArray = this.utilsService.enumToKeysArray(sexType);
  }
}
