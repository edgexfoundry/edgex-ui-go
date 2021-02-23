import { ProfileProperty } from "./profile-property";

export interface DeviceResource {
    name: string,
    description: string,
    tag: string,
    properties: ProfileProperty,
    //map[string]string
    attributes: any
}
