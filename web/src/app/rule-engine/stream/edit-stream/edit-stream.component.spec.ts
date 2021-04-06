import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStreamComponent } from './edit-stream.component';

describe('EditStreamComponent', () => {
  let component: EditStreamComponent;
  let fixture: ComponentFixture<EditStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
