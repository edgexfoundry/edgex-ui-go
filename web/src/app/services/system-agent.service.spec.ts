import { TestBed } from '@angular/core/testing';

import { SystemAgentService } from './system-agent.service';

describe('SystemAgentService', () => {
  let service: SystemAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
