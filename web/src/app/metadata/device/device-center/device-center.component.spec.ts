import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCenterComponent } from './device-center.component';

describe('DeviceCenterComponent', () => {
  let component: DeviceCenterComponent;
  let fixture: ComponentFixture<DeviceCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
