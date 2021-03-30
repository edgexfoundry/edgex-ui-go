import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalActionListComponent } from './interval-action-list.component';

describe('IntervalActionListComponent', () => {
  let component: IntervalActionListComponent;
  let fixture: ComponentFixture<IntervalActionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalActionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
