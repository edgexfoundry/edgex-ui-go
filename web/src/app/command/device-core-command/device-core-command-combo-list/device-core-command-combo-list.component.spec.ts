import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCoreCommandComboListComponent } from './device-core-command-combo-list.component';

describe('DeviceCoreCommandComboListComponent', () => {
  let component: DeviceCoreCommandComboListComponent;
  let fixture: ComponentFixture<DeviceCoreCommandComboListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCoreCommandComboListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCoreCommandComboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
