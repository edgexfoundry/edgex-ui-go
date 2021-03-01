import { BaseResponse } from "../common/base-response";
import { DeviceService } from "../device-service";

export interface DeviceServiceResponse extends BaseResponse {
    service: DeviceService
}

export interface MultiDeviceServiceResponse extends BaseResponse {
    services: DeviceService[]
}
