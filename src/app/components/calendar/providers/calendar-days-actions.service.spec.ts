import { TestBed, inject } from '@angular/core/testing';

import { CalendarDaysActionsService } from './calendar-days-actions.service';

describe('CalendarDaysActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarDaysActionsService]
    });
  });

  it('should be created', inject([CalendarDaysActionsService], (service: CalendarDaysActionsService) => {
    expect(service).toBeTruthy();
  }));
});
