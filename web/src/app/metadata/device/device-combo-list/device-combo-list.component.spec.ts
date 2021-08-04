import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComboListComponent } from './device-combo-list.component';

describe('DeviceComboListComponent', () => {
  let component: DeviceComboListComponent;
  let fixture: ComponentFixture<DeviceComboListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceComboListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceComboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
