import { ResourceProperties } from "./resource-properties";

export interface DeviceResource {
    description: string,
    name: string,
    isHidden: boolean,
    tag: string,
    properties: ResourceProperties
    // properties: PropertyValue, //deprecated
    attributes: {}
}
