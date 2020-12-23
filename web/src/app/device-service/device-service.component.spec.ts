import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceServiceComponent } from './device-service.component';

describe('DeviceServiceComponent', () => {
  let component: DeviceServiceComponent;
  let fixture: ComponentFixture<DeviceServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
