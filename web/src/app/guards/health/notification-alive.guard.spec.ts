import { TestBed } from '@angular/core/testing';

import { NotificationAliveGuard } from './notification-alive.guard';

describe('NotificationAliveGuard', () => {
  let guard: NotificationAliveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotificationAliveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
