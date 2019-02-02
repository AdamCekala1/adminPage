import { TestBed, inject } from '@angular/core/testing';

import { CalendarDataHandlerService } from './calendar-data-handler.service';

describe('CalendarDataHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarDataHandlerService]
    });
  });

  it('should be created', inject([CalendarDataHandlerService], (service: CalendarDataHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
