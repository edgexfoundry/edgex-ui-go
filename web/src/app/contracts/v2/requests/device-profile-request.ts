import { DeviceProfile } from "../device-profile";
import { BaseRequest } from "../common/base-request";

export interface DeviceProfileRequest extends BaseRequest {
    profile: DeviceProfile
}
