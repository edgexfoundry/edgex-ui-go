import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByProfileNameComponent } from './filter-by-profile-name.component';

describe('FilterByProfileNameComponent', () => {
  let component: FilterByProfileNameComponent;
  let fixture: ComponentFixture<FilterByProfileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByProfileNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByProfileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
