import { PropertyValue } from "../property-value";

export interface DeviceResource {
    description: string,
    name: string,
    tag: string,
    properties: PropertyValue,
    attributes: {}
}
