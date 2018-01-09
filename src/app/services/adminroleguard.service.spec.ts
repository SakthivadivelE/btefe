import { TestBed, inject } from '@angular/core/testing';

import { AdminroleguardService } from './adminroleguard.service';

describe('AdminroleguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminroleguardService]
    });
  });

  it('should be created', inject([AdminroleguardService], (service: AdminroleguardService) => {
    expect(service).toBeTruthy();
  }));
});
