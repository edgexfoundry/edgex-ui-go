import { TestBed } from '@angular/core/testing';

import { SystemAgentAliveGuard } from './system-agent-alive.guard';

describe('SystemAgentAliveGuard', () => {
  let guard: SystemAgentAliveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SystemAgentAliveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
