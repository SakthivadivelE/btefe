import { TestBed, inject } from '@angular/core/testing';

import { LoginrouteguardService } from './loginrouteguard.service';

describe('LoginrouteguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginrouteguardService]
    });
  });

  it('should be created', inject([LoginrouteguardService], (service: LoginrouteguardService) => {
    expect(service).toBeTruthy();
  }));
});
