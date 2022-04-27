import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTTPExportComponent } from './httpexport.component';

describe('HTTPExportComponent', () => {
  let component: HTTPExportComponent;
  let fixture: ComponentFixture<HTTPExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HTTPExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HTTPExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
