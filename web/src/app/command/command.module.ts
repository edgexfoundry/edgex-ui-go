import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandRoutingModule } from './command-routing.module';
import { DeviceCoreCommandComboListComponent } from './device-core-command/device-core-command-combo-list/device-core-command-combo-list.component';
import { DeviceAssociatedCoreCommandListComponent } from './device-core-command/device-associated-core-command-list/device-associated-core-command-list.component';


@NgModule({
  declarations: [DeviceCoreCommandComboListComponent, DeviceAssociatedCoreCommandListComponent],
  imports: [
    CommonModule,
    CommandRoutingModule
  ]
})
export class CommandModule { }
