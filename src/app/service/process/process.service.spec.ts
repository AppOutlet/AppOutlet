import { TestBed } from '@angular/core/testing';

import { ProcessService } from './process.service';

describe('ProcessService', () => {
  let service: ProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
