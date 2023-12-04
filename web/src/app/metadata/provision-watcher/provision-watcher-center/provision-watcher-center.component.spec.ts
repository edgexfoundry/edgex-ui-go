import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionWatcherCenterComponent } from './provision-watcher-center.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProvisionWatcherCenterComponent', () => {
  let component: ProvisionWatcherCenterComponent;
  let fixture: ComponentFixture<ProvisionWatcherCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ProvisionWatcherCenterComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionWatcherCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
