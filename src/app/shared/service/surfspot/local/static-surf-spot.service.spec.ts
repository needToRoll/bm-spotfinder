import { TestBed } from '@angular/core/testing';

import { StaticSurfSpotService } from './static-surf-spot.service';

describe('SurfSpotService', () => {
  let service: StaticSurfSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticSurfSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
