import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProfileListComponent } from './device-profile-list.component';

describe('DeviceProfileListComponent', () => {
  let component: DeviceProfileListComponent;
  let fixture: ComponentFixture<DeviceProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceProfileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
