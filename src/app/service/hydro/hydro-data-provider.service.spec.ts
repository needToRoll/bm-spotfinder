import { TestBed } from '@angular/core/testing';

import { HydroDataProviderService } from './hydro-data-provider.service';

describe('HydroDataProviderService', () => {
  let service: HydroDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HydroDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
