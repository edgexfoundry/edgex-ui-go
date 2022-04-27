import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MQTTExportComponent } from './mqttexport.component';

describe('MQTTExportComponent', () => {
  let component: MQTTExportComponent;
  let fixture: ComponentFixture<MQTTExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MQTTExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MQTTExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
