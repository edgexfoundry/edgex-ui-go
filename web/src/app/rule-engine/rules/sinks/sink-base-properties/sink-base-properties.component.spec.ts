import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinkBasePropertiesComponent } from './sink-base-properties.component';

describe('SinkBasePropertiesComponent', () => {
  let component: SinkBasePropertiesComponent;
  let fixture: ComponentFixture<SinkBasePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinkBasePropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinkBasePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
