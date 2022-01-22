import { TestBed } from '@angular/core/testing';

import { RuleEngineAliveGuard } from './rule-engine-alive.guard';

describe('RuleEngineAliveGuard', () => {
  let guard: RuleEngineAliveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RuleEngineAliveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
