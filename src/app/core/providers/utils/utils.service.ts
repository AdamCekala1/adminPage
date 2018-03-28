import { Injectable } from '@angular/core';
import { filter, findIndex, forEach, isNaN } from 'lodash';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class UtilsService {
  enumToKeysArray(userEnum): string[] {
    const result: string[] = [];

    forEach(userEnum, (key: string) => {
      if (isNaN(+key)) {
        result.push(key);
      }
    });

    return result;
  }

  subtractArrays<T>(minuendArray: T[], subtrahendArray: T[]): T[] {
    return filter(minuendArray, (minuendItem: T) => {
        return findIndex(subtrahendArray, minuendItem) < 0;
    });
  }

  checkInputIsInvalid(control: AbstractControl): boolean {
    return control.errors && control.touched;
  }
}
