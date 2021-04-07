import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionWatcherListComponent } from './provision-watcher-list.component';

describe('ProvisionWatcherListComponent', () => {
  let component: ProvisionWatcherListComponent;
  let fixture: ComponentFixture<ProvisionWatcherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionWatcherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionWatcherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
