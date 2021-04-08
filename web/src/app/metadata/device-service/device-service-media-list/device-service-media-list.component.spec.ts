import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceServiceMediaListComponent } from './device-service-media-list.component';

describe('DeviceServiceListComponent', () => {
  let component: DeviceServiceMediaListComponent;
  let fixture: ComponentFixture<DeviceServiceMediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceServiceMediaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceServiceMediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
