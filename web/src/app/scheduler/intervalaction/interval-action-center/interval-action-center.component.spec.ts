import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalActionCenterComponent } from './interval-action-center.component';

describe('IntervalActionCenterComponent', () => {
  let component: IntervalActionCenterComponent;
  let fixture: ComponentFixture<IntervalActionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalActionCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalActionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
