import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgexSinkOptionalComponent } from './edgex-sink-optional.component';

describe('EdgexSinkOptionalComponent', () => {
  let component: EdgexSinkOptionalComponent;
  let fixture: ComponentFixture<EdgexSinkOptionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgexSinkOptionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgexSinkOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
