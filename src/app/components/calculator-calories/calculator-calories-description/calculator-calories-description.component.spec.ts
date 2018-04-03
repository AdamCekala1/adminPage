import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorCaloriesDescriptionComponent } from './calculator-calories-description.component';

describe('CalculatorCaloriesDescriptionComponent', () => {
  let component: CalculatorCaloriesDescriptionComponent;
  let fixture: ComponentFixture<CalculatorCaloriesDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorCaloriesDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorCaloriesDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
