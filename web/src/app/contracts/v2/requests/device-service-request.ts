import { BaseRequest } from "../common/base-request";
import { DeviceService } from "../device-service";

export interface DeviceServiceRequest extends BaseRequest{
    service: DeviceService
}
