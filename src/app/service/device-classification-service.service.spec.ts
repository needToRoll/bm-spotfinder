import { TestBed } from '@angular/core/testing';

import { DeviceClassificationService } from './device-classification.service';

describe('DeviceClassificationServiceService', () => {
  let service: DeviceClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
