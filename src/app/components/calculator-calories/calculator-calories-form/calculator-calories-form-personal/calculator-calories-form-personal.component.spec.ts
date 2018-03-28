import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesFormPersonalComponent } from './calculator-calories-form-personal.component';

describe('CalculatorCaloriesFormPersonalComponent', () => {
  let component: CalculatorCaloriesFormPersonalComponent;
  let fixture: ComponentFixture<CalculatorCaloriesFormPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesFormPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesFormPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
