import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JSONLogicComponent } from './jsonlogic.component';

describe('JSONLogicComponent', () => {
  let component: JSONLogicComponent;
  let fixture: ComponentFixture<JSONLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JSONLogicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JSONLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
