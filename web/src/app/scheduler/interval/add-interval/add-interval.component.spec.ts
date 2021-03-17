import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntervalComponent } from './add-interval.component';

describe('AddIntervalComponent', () => {
  let component: AddIntervalComponent;
  let fixture: ComponentFixture<AddIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
