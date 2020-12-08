import { TestBed } from '@angular/core/testing';

import { RuleEngineService } from './rule-engine.service';

describe('RuleEngineService', () => {
  let service: RuleEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
