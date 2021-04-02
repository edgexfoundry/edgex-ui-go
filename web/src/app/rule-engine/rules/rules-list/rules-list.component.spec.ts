import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesListComponent } from './rules-list.component';

describe('RuleListComponent', () => {
  let component: RulesListComponent;
  let fixture: ComponentFixture<RulesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
