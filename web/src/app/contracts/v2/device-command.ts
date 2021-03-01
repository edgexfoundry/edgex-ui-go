import { ResourceOperation } from "../resource-operation";

export interface DeviceCommand  {
    name: string,
    get: ResourceOperation[],
    set: ResourceOperation[]
}
