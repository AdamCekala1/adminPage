import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesFormComponent } from './calculator-calories-form.component';

describe('CalculatorCaloriesFormComponent', () => {
  let component: CalculatorCaloriesFormComponent;
  let fixture: ComponentFixture<CalculatorCaloriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
