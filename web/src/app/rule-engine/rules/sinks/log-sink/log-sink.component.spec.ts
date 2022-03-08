import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSinkComponent } from './log-sink.component';

describe('LogSinkComponent', () => {
  let component: LogSinkComponent;
  let fixture: ComponentFixture<LogSinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogSinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
