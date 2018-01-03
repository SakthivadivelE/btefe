import { TestBed, inject } from '@angular/core/testing';

import { TestsampleService } from './testsample.service';

describe('TestsampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestsampleService]
    });
  });

  it('should be created', inject([TestsampleService], (service: TestsampleService) => {
    expect(service).toBeTruthy();
  }));
});
