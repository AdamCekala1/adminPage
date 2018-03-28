import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesFormTrainingComponent } from './calculator-calories-form-training.component';

describe('CalculatorCaloriesFormTrainingComponent', () => {
  let component: CalculatorCaloriesFormTrainingComponent;
  let fixture: ComponentFixture<CalculatorCaloriesFormTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesFormTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesFormTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
