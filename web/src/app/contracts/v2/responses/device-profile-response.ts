import { DeviceProfile } from "../device-profile";
import { BaseResponse } from "../common/base-response";

export interface DeviceProfileResponse extends BaseResponse {
    profile: DeviceProfile
}

export interface MultiDeviceProfileResponse extends BaseResponse {
    profiles: DeviceProfile[]
}
