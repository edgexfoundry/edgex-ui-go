import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandServiceTemplateComponent } from './command-service-template.component';

describe('CommandServiceTemplateComponent', () => {
  let component: CommandServiceTemplateComponent;
  let fixture: ComponentFixture<CommandServiceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandServiceTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandServiceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
