import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesCalculatorDisplayComponent } from './calories-calculator-display.component';

describe('CaloriesCalculatorDisplayComponent', () => {
  let component: CaloriesCalculatorDisplayComponent;
  let fixture: ComponentFixture<CaloriesCalculatorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaloriesCalculatorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloriesCalculatorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
