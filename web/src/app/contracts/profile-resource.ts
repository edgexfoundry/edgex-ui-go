import { ResourceOperation } from "./resource-operation";

export interface ProfileResource {
    name: string,
    get: ResourceOperation[],
    set: ResourceOperation[]
}
