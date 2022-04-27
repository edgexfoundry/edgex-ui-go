import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptComponent } from './encrypt.component';

describe('EncryptComponent', () => {
  let component: EncryptComponent;
  let fixture: ComponentFixture<EncryptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
