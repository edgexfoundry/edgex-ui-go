import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvisionWatcherComponent } from './add-provision-watcher.component';

describe('AddProvisionWatcherComponent', () => {
  let component: AddProvisionWatcherComponent;
  let fixture: ComponentFixture<AddProvisionWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProvisionWatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProvisionWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
