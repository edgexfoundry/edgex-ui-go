import { BaseResponse } from "../common/base-response";
import { Device } from "../device";

export interface DeviceResponse extends BaseResponse {
    device: Device
}

export interface MultiDeviceResponse extends BaseResponse {
    devices: Device[]
}
