import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceComboListComponent } from './source-combo-list.component';

describe('SourceComboListComponent', () => {
  let component: SourceComboListComponent;
  let fixture: ComponentFixture<SourceComboListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceComboListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceComboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
