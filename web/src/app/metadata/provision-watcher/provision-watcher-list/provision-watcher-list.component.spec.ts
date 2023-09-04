import { NO_ERRORS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionWatcherListComponent } from './provision-watcher-list.component';
import { MetadataService } from '../../../services/metadata.service';

describe('ProvisionWatcherListComponent', () => {
  let component: ProvisionWatcherListComponent;
  let fixture: ComponentFixture<ProvisionWatcherListComponent>;
  let mockMetadataService: MetadataService
  beforeEach(async () => {
    mockMetadataService = jasmine.createSpyObj('MetadataService', {
      allProvisionWatchersPagination: of({provisionWatchers:[]}),
      findProvisionWatcherByName: undefined
    })
    await TestBed.configureTestingModule({
      declarations: [ ProvisionWatcherListComponent ],
      imports: [RouterTestingModule, FormsModule],
      providers: [{provide: MetadataService, useValue: mockMetadataService},],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProvisionWatcherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('finds provision watcher pagination',() => {
    expect(mockMetadataService.allProvisionWatchersPagination).toHaveBeenCalledWith(0,5);
  })

  it('not find provision watcher by profileName',() => {
    expect(mockMetadataService.findProvisionWatcherByName).not.toHaveBeenCalledWith('sample-provision-name');
  })
});
