import { TestBed } from '@angular/core/testing';

import { SurfSpotService } from './surf-spot.service';

describe('SurfSpotService', () => {
  let service: SurfSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurfSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
