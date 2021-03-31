import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProfileCenterComponent } from './device-profile-center.component';

describe('DeviceProfileCenterComponent', () => {
  let component: DeviceProfileCenterComponent;
  let fixture: ComponentFixture<DeviceProfileCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceProfileCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProfileCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
