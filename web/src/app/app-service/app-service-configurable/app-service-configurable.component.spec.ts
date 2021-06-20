import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServiceConfigurableComponent } from './app-service-configurable.component';

describe('AppServiceConfigurableComponent', () => {
  let component: AppServiceConfigurableComponent;
  let fixture: ComponentFixture<AppServiceConfigurableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppServiceConfigurableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppServiceConfigurableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
