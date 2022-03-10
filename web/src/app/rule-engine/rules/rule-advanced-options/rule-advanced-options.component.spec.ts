import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleAdvancedOptionsComponent } from './rule-advanced-options.component';

describe('RuleAdvancedOptionsComponent', () => {
  let component: RuleAdvancedOptionsComponent;
  let fixture: ComponentFixture<RuleAdvancedOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleAdvancedOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleAdvancedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
