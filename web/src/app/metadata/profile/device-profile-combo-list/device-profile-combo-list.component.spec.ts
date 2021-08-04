import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProfileComboListComponent } from './device-profile-combo-list.component';

describe('DeviceProfileComboListComponent', () => {
  let component: DeviceProfileComboListComponent;
  let fixture: ComponentFixture<DeviceProfileComboListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceProfileComboListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProfileComboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
