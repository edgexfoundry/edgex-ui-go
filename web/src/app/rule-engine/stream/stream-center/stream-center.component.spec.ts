import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamCenterComponent } from './stream-center.component';

describe('StreamCenterComponent', () => {
  let component: StreamCenterComponent;
  let fixture: ComponentFixture<StreamCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
