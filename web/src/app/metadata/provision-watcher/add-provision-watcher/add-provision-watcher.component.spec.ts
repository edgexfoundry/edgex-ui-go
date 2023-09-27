import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AddProvisionWatcherComponent } from './add-provision-watcher.component';
import { MetadataService } from '../../../services/metadata.service';
describe('AddProvisionWatcherComponent', () => {
  let component: AddProvisionWatcherComponent;
  let fixture: ComponentFixture<AddProvisionWatcherComponent>;
  let mockMetadataService: MetadataService

  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      ping: of({})
    })

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ AddProvisionWatcherComponent ],
      providers: [
        {provide: MetadataService, useValue: mockMetadataService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProvisionWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
