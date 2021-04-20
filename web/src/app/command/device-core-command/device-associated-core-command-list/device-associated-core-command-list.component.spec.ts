import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAssociatedCoreCommandListComponent } from './device-associated-core-command-list.component';

describe('DeviceCoreCommandListComponent', () => {
  let component: DeviceAssociatedCoreCommandListComponent;
  let fixture: ComponentFixture<DeviceAssociatedCoreCommandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAssociatedCoreCommandListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAssociatedCoreCommandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
