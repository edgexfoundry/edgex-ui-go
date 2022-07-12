/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { CoreCommand } from '../../../contracts/v2/core-command';
import { CoreCommandParameter } from '../../../contracts/v2/core-command';
import { EventResponse } from '../../../contracts/v2/responses/event-response';
import { BaseReading } from '../../../contracts/v2/reading';
import { BaseResponse } from '../../../contracts/v2/common/base-response';
import { DeviceCoreCommandResponse } from '../../../contracts/v2/responses/device-core-command-response';
import { DeviceProfileResponse } from '../../../contracts/v2/responses/device-profile-response';
import { DeviceProfile } from '../../../contracts/v2/device-profile';

import { CommandService } from '../../../services/command.service';
import { MetadataService } from '../../../services/metadata.service';

declare type ParameterBearer = {
  [key: string]:  any
}

@Component({
  selector: 'app-device-command-viewer',
  templateUrl: './device-command-viewer.component.html',
  styleUrls: ['./device-command-viewer.component.css']
})
export class DeviceCommandViewerComponent implements OnInit, OnChanges {

  @Input() deviceName?: string 

  deviceCoreCommand?: CoreCommand[];

  selectedCmd: CoreCommand = {} as CoreCommand;
  selectedCmdSetParams: CoreCommandParameter[] = [];
  parameterBearerList: ParameterBearer[] = []

  cmdBinaryResponse: any;
  cmdBinaryResponseURL?: string;

  cmdGetResponse: any;
  cmdGetResponseRaw: any;

  cmdSetResponse: any;
  cmdSetResponseRaw: any;

  associatedCmdDeviceName?: string;
  associateDeviceProfile?: DeviceProfile

  constructor(private cmdSvc: CommandService, private metadataSvc: MetadataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (!this.deviceName) {
      return
    }
    this.resetResponse();

    this.cmdSvc
    .findDeviceAssociatedCommnadsByDeviceName(this.deviceName)
    .subscribe((data: DeviceCoreCommandResponse) => {
      this.associatedCmdDeviceName = data.deviceCoreCommand.deviceName;
      this.deviceCoreCommand = data.deviceCoreCommand.coreCommands;

      if (!this.deviceCoreCommand || this.deviceCoreCommand.length === 0) {
        return
      }

      //init selectedCmd for first one
      this.selectedCmd = this.deviceCoreCommand[0];
      this.selectedCmdSetParams = this.selectedCmd.parameters;
      this.setParameterBearerList()

      this.getAssociatedDeviceProfile(data.deviceCoreCommand.profileName)
    })
  }

  getAssociatedDeviceProfile(profileName: string) {
    this.metadataSvc
    .findProfileByName(profileName)
    .subscribe((data:DeviceProfileResponse) => this.associateDeviceProfile = data.profile);
  }
  
  selectCmd(cmd: CoreCommand) {
    this.selectedCmd = cmd;
    this.selectedCmdSetParams = this.selectedCmd.parameters;
    this.resetResponse();
    this.setParameterBearerList()
  }

  setParameterBearerList() {
    this.parameterBearerList =  []
    this.selectedCmdSetParams.forEach(p  => {
      let paramBearer: ParameterBearer = {
        'key': p.resourceName,
        'value': ''
      }
      this.parameterBearerList.push(paramBearer)
    })
  }

  resetResponse() {
    this.cmdGetResponse = "";
    this.cmdGetResponseRaw = "";

    this.cmdSetResponse = "";
    this.cmdSetResponseRaw = "";

    this.cmdBinaryResponse = true;
    this.cmdBinaryResponseURL = "";
  }

  isBinaryResource(): boolean {
    let isBinary = false;

    this.associateDeviceProfile!.deviceResources.forEach(resource => {
      if (resource.name === this.selectedCmd!.name && resource.properties.valueType === "Binary") {
          isBinary = true
          return
      }
    });

    if (isBinary) {
      return isBinary
    }

    this.associateDeviceProfile!.deviceCommands.forEach(dc => {
      if (dc.name === this.selectedCmd!.name) {
        dc.resourceOperations.forEach(ro => {
          this.associateDeviceProfile!.deviceResources.forEach(dr => {
            if (ro.deviceResource === dr.name && dr.properties.valueType === "Binary") {
              isBinary = true
              return
            }
          });
        })
      }
    });

    return isBinary
  }

  issueGetCmd() {
    this.cmdSvc
    .issueGetCmd(this.associatedCmdDeviceName as string, this.selectedCmd!.name as string)
    .subscribe((resp: EventResponse) => {
      this.cmdGetResponseRaw = JSON.stringify(resp.event.readings, null, 3);
      if (this.isBinaryResource()) {
        this.cmdGetResponse = "Binary resource is not supported for preview"
        return
      }
      let result: any[] = [];
      resp.event.readings.forEach((reading: BaseReading) => {
        result.push(reading.value);
      });
      this.cmdGetResponse = result.join(',');
    })
  }

  issueGetCmdOfBinaryResource() {
    this.cmdSvc.issueGetBinaryCmd(this.associatedCmdDeviceName as string, this.selectedCmd!.name as string)
      .subscribe((data: any) => {
        let result = CBOR.decode(data)
        if (result.mediaType === "image/jpeg" ||
          result.mediaType === "image/jpg" ||
          result.mediaType === "image/png"
        ) {
          this.cmdBinaryResponse = result.binaryValue;
          this.cmdBinaryResponseURL = URL.createObjectURL(this.cmdBinaryResponse);
        } else {
          this.cmdBinaryResponse = "only image binary is supported";
        }
      })
  }

  issueSetCmd() {
    let params: any = {};
    this.parameterBearerList.forEach((paramBearer) => {
      params[paramBearer.key] = paramBearer.value
    })
    
    this.cmdSvc
    .issueSetCmd(this.associatedCmdDeviceName as string, this.selectedCmd?.name as string, params)
    .subscribe((resp: BaseResponse) => {
      this.cmdSetResponseRaw = JSON.stringify(resp, null, 3);
      this.cmdSetResponse = resp.message
    })
  }

}
