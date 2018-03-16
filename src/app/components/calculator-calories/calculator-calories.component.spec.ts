import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesComponent } from './calculator-calories.component';

describe('CalculatorCaloriesComponent', () => {
  let component: CalculatorCaloriesComponent;
  let fixture: ComponentFixture<CalculatorCaloriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
