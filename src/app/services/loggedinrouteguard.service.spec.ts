import { TestBed, inject } from '@angular/core/testing';

import { LoggedinrouteguardService } from './loggedinrouteguard.service';

describe('LoggedinrouteguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedinrouteguardService]
    });
  });

  it('should be created', inject([LoggedinrouteguardService], (service: LoggedinrouteguardService) => {
    expect(service).toBeTruthy();
  }));
});
