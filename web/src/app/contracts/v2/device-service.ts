import { Versionable } from "./common/versionable";

export interface DeviceService extends Versionable {
    id: string,
    name: string,
    description: string,
    lastConnected: boolean,
    lastReported: boolean,
    labels: string[],
    baseAddress: string,
    adminState: string,
    created: number,
    modified: number
}
