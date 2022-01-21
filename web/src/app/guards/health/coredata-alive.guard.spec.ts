import { TestBed } from '@angular/core/testing';

import { CoredataAliveGuard } from './coredata-alive.guard';

describe('CoredataAliveGuard', () => {
  let guard: CoredataAliveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoredataAliveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
