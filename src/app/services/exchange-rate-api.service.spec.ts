import { TestBed } from '@angular/core/testing';

import { ExchangeRateAPIService } from './exchange-rate-api.service';

describe('ExchangeRateAPIService', () => {
  let service: ExchangeRateAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRateAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
