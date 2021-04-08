import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesCenterComponent } from './rules-center.component';

describe('RulesCenterComponent', () => {
  let component: RulesCenterComponent;
  let fixture: ComponentFixture<RulesCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
