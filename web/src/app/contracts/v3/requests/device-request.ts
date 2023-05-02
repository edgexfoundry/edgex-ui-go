import { BaseRequest } from "../common/base-request";
import { Device } from "../device";

export interface DeviceRequest extends BaseRequest {
    device: Device
}
