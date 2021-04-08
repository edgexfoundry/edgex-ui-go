import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProvisionWatcherComponent } from './edit-provision-watcher.component';

describe('EditProvisionWatcherComponent', () => {
  let component: EditProvisionWatcherComponent;
  let fixture: ComponentFixture<EditProvisionWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProvisionWatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProvisionWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
