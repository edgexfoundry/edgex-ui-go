import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttSinkComponent } from './mqtt-sink.component';

describe('MqttSinkComponent', () => {
  let component: MqttSinkComponent;
  let fixture: ComponentFixture<MqttSinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqttSinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
