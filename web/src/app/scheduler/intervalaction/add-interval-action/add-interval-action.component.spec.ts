import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntervalActionComponent } from './add-interval-action.component';

describe('AddIntervalActionComponent', () => {
  let component: AddIntervalActionComponent;
  let fixture: ComponentFixture<AddIntervalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIntervalActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntervalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
