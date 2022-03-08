import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommandRoutingModule } from './command-routing.module';
import { DeviceCoreCommandComboListComponent } from './device-core-command/device-core-command-combo-list/device-core-command-combo-list.component';
import { DeviceAssociatedCoreCommandListComponent } from './device-core-command/device-associated-core-command-list/device-associated-core-command-list.component';
import { DeviceCoreCommandListComponent } from './device-core-command/device-core-command-list/device-core-command-list.component';
import { CommandServiceTemplateComponent } from './command-service-template/command-service-template.component';


@NgModule({
  declarations: [DeviceCoreCommandComboListComponent, DeviceAssociatedCoreCommandListComponent, DeviceCoreCommandListComponent, CommandServiceTemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommandRoutingModule
  ],
  exports: [
    DeviceCoreCommandComboListComponent, DeviceAssociatedCoreCommandListComponent, DeviceCoreCommandListComponent, CommandServiceTemplateComponent
  ]
})
export class CommandModule { }
