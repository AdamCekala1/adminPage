import { TestBed, inject } from '@angular/core/testing';

import { DaysActionsService } from './days-actions.service';

describe('DaysActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaysActionsService]
    });
  });

  it('should be created', inject([DaysActionsService], (service: DaysActionsService) => {
    expect(service).toBeTruthy();
  }));
});
