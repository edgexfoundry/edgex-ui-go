import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalComboListComponent } from './interval-combo-list.component';

describe('IntervalComboListComponent', () => {
  let component: IntervalComboListComponent;
  let fixture: ComponentFixture<IntervalComboListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalComboListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalComboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
