import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgexSinkComponent } from './edgex-sink.component';

describe('EdgexSinkComponent', () => {
  let component: EdgexSinkComponent;
  let fixture: ComponentFixture<EdgexSinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgexSinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgexSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
