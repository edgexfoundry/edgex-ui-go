import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformComponent } from './transform.component';

describe('TransformComponent', () => {
  let component: TransformComponent;
  let fixture: ComponentFixture<TransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
