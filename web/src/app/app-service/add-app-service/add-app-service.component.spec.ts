import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppServiceComponent } from './add-app-service.component';

describe('AddAppServiceComponent', () => {
  let component: AddAppServiceComponent;
  let fixture: ComponentFixture<AddAppServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
