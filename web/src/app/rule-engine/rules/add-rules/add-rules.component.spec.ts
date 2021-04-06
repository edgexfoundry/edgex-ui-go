import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRulesComponent } from './add-rules.component';

describe('AddRulesComponent', () => {
  let component: AddRulesComponent;
  let fixture: ComponentFixture<AddRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
