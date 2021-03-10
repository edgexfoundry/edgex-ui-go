import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalCenterComponent } from './interval-center.component';

describe('IntervalCenterComponent', () => {
  let component: IntervalCenterComponent;
  let fixture: ComponentFixture<IntervalCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
