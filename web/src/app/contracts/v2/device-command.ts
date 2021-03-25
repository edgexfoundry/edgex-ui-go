import { ResourceOperation } from "./resource-operation";

export interface DeviceCommand  {
    name: string,
    isHidden: boolean,
    readWrite: string,
    resourceOperations: ResourceOperation[]
    // get: ResourceOperation[], //deprecated
    // set: ResourceOperation[] //deprecated
}
