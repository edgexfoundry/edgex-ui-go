import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCoreCommandListComponent } from './device-core-command-list.component';

describe('DeviceCoreCommandListComponent', () => {
  let component: DeviceCoreCommandListComponent;
  let fixture: ComponentFixture<DeviceCoreCommandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCoreCommandListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCoreCommandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
