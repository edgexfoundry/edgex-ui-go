import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestSinkComponent } from './rest-sink.component';

describe('RestSinkComponent', () => {
  let component: RestSinkComponent;
  let fixture: ComponentFixture<RestSinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestSinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
