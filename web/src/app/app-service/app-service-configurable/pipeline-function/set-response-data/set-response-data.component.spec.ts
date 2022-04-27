import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetResponseDataComponent } from './set-response-data.component';

describe('SetResponseDataComponent', () => {
  let component: SetResponseDataComponent;
  let fixture: ComponentFixture<SetResponseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetResponseDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetResponseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
