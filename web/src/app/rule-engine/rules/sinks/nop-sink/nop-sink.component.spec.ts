import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NopSinkComponent } from './nop-sink.component';

describe('NopSinkComponent', () => {
  let component: NopSinkComponent;
  let fixture: ComponentFixture<NopSinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NopSinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NopSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
