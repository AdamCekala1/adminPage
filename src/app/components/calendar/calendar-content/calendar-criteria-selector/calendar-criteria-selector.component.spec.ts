import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCriteriaSelectorComponent } from './calendar-criteria-selector.component';

describe('CalendarCriteriaSelectorComponent', () => {
  let component: CalendarCriteriaSelectorComponent;
  let fixture: ComponentFixture<CalendarCriteriaSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCriteriaSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCriteriaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
