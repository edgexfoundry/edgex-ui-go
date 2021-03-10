import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntervalActionComponent } from './edit-interval-action.component';

describe('EditIntervalActionComponent', () => {
  let component: EditIntervalActionComponent;
  let fixture: ComponentFixture<EditIntervalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIntervalActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIntervalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
