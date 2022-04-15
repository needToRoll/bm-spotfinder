import { TestBed } from '@angular/core/testing';

import { SpotImporterService } from './spot-importer.service';

describe('SpotImporterService', () => {
  let service: SpotImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
