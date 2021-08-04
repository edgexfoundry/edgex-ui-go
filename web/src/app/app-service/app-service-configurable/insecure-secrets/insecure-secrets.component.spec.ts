import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsecureSecretsComponent } from './insecure-secrets.component';

describe('InsecureSecretsComponent', () => {
  let component: InsecureSecretsComponent;
  let fixture: ComponentFixture<InsecureSecretsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsecureSecretsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsecureSecretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
