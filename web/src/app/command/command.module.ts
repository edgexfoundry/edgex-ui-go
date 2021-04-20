import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommandRoutingModule } from './command-routing.module';
import { DeviceCoreCommandComboListComponent } from './device-core-command/device-core-command-combo-list/device-core-command-combo-list.component';
import { DeviceAssociatedCoreCommandListComponent } from './device-core-command/device-associated-core-command-list/device-associated-core-command-list.component';
import { DeviceCoreCommandListComponent } from './device-core-command/device-core-command-list/device-core-command-list.component';


@NgModule({
  declarations: [DeviceCoreCommandComboListComponent, DeviceAssociatedCoreCommandListComponent, DeviceCoreCommandListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommandRoutingModule
  ],
  exports: [
    DeviceCoreCommandComboListComponent, DeviceAssociatedCoreCommandListComponent, DeviceCoreCommandListComponent
  ]
})
export class CommandModule { }
