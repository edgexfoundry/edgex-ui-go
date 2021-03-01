import { Versionable } from "./common/versionable";
import { BaseReading } from "./reading";

export interface Event extends Versionable{
    id: string,
    deviceName: string,
    profileName: string,
    sourceName: string,
    created: boolean,
    origin: boolean,
    readings: BaseReading[],
    tags: {}
}
