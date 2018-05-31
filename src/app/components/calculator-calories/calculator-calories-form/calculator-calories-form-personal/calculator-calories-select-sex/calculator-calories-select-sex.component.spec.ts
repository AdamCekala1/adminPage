import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesSelectSexComponent } from './calculator-calories-select-sex.component';

describe('CalculatorCaloriesSelectSexComponent', () => {
  let component: CalculatorCaloriesSelectSexComponent;
  let fixture: ComponentFixture<CalculatorCaloriesSelectSexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesSelectSexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesSelectSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
