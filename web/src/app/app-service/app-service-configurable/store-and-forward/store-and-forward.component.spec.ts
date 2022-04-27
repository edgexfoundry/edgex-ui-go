import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAndForwardComponent } from './store-and-forward.component';

describe('StoreAndForwardComponent', () => {
  let component: StoreAndForwardComponent;
  let fixture: ComponentFixture<StoreAndForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAndForwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAndForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
