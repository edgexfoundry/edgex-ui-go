import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBySourceNameComponent } from './filter-by-source-name.component';

describe('FilterBySourceNameComponent', () => {
  let component: FilterBySourceNameComponent;
  let fixture: ComponentFixture<FilterBySourceNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterBySourceNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBySourceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
