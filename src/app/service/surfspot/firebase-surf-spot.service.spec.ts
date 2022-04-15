import {TestBed} from '@angular/core/testing';
import {FirebaseSurfSpotService} from "./firebase-surf-spot.service";

describe('SurfSpotService', () => {
  let service: FirebaseSurfSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseSurfSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
