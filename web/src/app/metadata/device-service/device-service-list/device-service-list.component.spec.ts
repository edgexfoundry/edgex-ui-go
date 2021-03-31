import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceServiceListComponent } from './device-service-list.component';

describe('DeviceServiceListComponent', () => {
  let component: DeviceServiceListComponent;
  let fixture: ComponentFixture<DeviceServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
