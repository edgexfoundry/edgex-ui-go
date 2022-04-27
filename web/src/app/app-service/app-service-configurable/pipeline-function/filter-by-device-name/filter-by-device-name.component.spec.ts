import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByDeviceNameComponent } from './filter-by-device-name.component';

describe('FilterByDeviceNameComponent', () => {
  let component: FilterByDeviceNameComponent;
  let fixture: ComponentFixture<FilterByDeviceNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByDeviceNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByDeviceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
