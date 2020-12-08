import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAgentComponent } from './system-agent.component';

describe('SystemAgentComponent', () => {
  let component: SystemAgentComponent;
  let fixture: ComponentFixture<SystemAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
