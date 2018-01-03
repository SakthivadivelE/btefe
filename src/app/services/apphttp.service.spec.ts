import { TestBed, inject } from '@angular/core/testing';

import { ApphttpService } from './apphttp.service';

describe('ApphttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApphttpService]
    });
  });

  it('should be created', inject([ApphttpService], (service: ApphttpService) => {
    expect(service).toBeTruthy();
  }));
});
