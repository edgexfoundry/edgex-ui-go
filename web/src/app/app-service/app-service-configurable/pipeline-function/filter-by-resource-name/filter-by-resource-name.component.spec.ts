import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByResourceNameComponent } from './filter-by-resource-name.component';

describe('FilterByResourceNameComponent', () => {
  let component: FilterByResourceNameComponent;
  let fixture: ComponentFixture<FilterByResourceNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByResourceNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByResourceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
