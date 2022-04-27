import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushToCoreComponent } from './push-to-core.component';

describe('PushToCoreComponent', () => {
  let component: PushToCoreComponent;
  let fixture: ComponentFixture<PushToCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushToCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushToCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
