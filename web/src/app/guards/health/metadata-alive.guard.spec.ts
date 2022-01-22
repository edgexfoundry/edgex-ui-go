import { TestBed } from '@angular/core/testing';

import { MetadataAliveGuard } from './metadata-alive.guard';

describe('MetadataAliveGuard', () => {
  let guard: MetadataAliveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MetadataAliveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
