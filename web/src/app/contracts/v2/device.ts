import { AutoEvent } from "./auto-event";
import { Versionable } from "./common/versionable";

export interface Device extends Versionable {
    id: string,
    name: string,
    description: string,
    adminState: string,
    operatingState: string,
    lastConnected?: number,
    lastReported?: number,
    labels: string[],
    location?: {} | any,
    serviceName: string,
    profileName: string,
    autoEvents: AutoEvent[],
    protocols: any,
    created: number,
    modified: number
}
