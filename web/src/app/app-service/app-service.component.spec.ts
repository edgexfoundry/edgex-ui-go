import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServiceComponent } from './app-service.component';

describe('AppServiceComponent', () => {
  let component: AppServiceComponent;
  let fixture: ComponentFixture<AppServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
