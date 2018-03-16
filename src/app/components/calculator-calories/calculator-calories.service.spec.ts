import { TestBed, inject } from '@angular/core/testing';

import { CalculatorCaloriesService } from './calculator-calories.service';

describe('CalculatorCaloriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorCaloriesService]
    });
  });

  it('should be created', inject([CalculatorCaloriesService], (service: CalculatorCaloriesService) => {
    expect(service).toBeTruthy();
  }));
});
