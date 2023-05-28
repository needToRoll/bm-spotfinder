import { TestBed } from '@angular/core/testing';

import { FirebaseWaterLevelService } from './firebase-water-level.service';

describe('FirebaseWaterLevelService', () => {
  let service: FirebaseWaterLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseWaterLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
