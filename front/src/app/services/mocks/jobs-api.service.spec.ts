import { TestBed } from '@angular/core/testing';

import { JobsAPIService } from './jobs-api.service';

describe('JobsAPIService', () => {
  let service: JobsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
