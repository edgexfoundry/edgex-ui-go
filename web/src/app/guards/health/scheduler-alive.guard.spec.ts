import { TestBed } from '@angular/core/testing';

import { SchedulerAliveGuard } from './scheduler-alive.guard';

describe('SchedulerAliveGuard', () => {
  let guard: SchedulerAliveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SchedulerAliveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
