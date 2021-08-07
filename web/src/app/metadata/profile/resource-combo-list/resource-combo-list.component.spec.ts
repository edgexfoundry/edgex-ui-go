import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceComboListComponent } from './resource-combo-list.component';

describe('ResourceComboListComponent', () => {
  let component: ResourceComboListComponent;
  let fixture: ComponentFixture<ResourceComboListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceComboListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceComboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
