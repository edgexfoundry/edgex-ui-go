import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCenterComponent } from './subscription-center.component';

describe('SubscriptionCenterComponent', () => {
  let component: SubscriptionCenterComponent;
  let fixture: ComponentFixture<SubscriptionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
