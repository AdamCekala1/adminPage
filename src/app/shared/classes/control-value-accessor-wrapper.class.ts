export abstract class ControlValueAccessorWrapper {
  onChange: (value: string) => void = () => {};

  registerOnTouched() {
  }

  writeValue(..._: any[]) {
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }
}
