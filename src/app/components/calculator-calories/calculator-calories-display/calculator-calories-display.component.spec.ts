import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesDisplayComponent } from './calories-calculator-display.component';

describe('CalculatorCaloriesDisplayComponent', () => {
  let component: CalculatorCaloriesDisplayComponent;
  let fixture: ComponentFixture<CalculatorCaloriesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
