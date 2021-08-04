import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineFunctionComponent } from './pipeline-function.component';

describe('PipelineFunctionComponent', () => {
  let component: PipelineFunctionComponent;
  let fixture: ComponentFixture<PipelineFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
