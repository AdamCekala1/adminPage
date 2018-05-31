import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesSelectBodyTypeComponent } from './calculator-calories-select-body-type.component';

describe('CalculatorCaloriesSelectBodyTypeComponent', () => {
  let component: CalculatorCaloriesSelectBodyTypeComponent;
  let fixture: ComponentFixture<CalculatorCaloriesSelectBodyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesSelectBodyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesSelectBodyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
