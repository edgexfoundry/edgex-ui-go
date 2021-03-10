import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntervalComponent } from './edit-interval.component';

describe('EditIntervalComponent', () => {
  let component: EditIntervalComponent;
  let fixture: ComponentFixture<EditIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
