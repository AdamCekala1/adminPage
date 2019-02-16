import { TestBed, inject } from '@angular/core/testing';

import { StorageCalendar } from './storage-calendar.service';

describe('StorageCalendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageCalendar]
    });
  });

  it('should be created', inject([StorageCalendar], (service: StorageCalendar) => {
    expect(service).toBeTruthy();
  }));
});
