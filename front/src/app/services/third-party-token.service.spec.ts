import { TestBed } from '@angular/core/testing';

import { ThirdPartyTokenService } from './third-party-token.service';

describe('CookiesService', () => {
  let service: ThirdPartyTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdPartyTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
