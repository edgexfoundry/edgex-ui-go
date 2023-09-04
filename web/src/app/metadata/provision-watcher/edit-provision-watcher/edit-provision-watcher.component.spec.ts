import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EditProvisionWatcherComponent } from './edit-provision-watcher.component';
import { MetadataService } from '../../../services/metadata.service';
describe('EditProvisionWatcherComponent', () => {
  let component: EditProvisionWatcherComponent;
  let fixture: ComponentFixture<EditProvisionWatcherComponent>;
  let mockMetadataService: MetadataService

  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      ping: of({})
    })

    await TestBed.configureTestingModule({
      declarations: [ EditProvisionWatcherComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: MetadataService, useValue: mockMetadataService}]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProvisionWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
