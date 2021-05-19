import { Versionable } from "./common/versionable";

export interface Interval extends Versionable {
    id: string,
    name: string,
    start?: string,
    end?: string,
    interval: string, // replace frequency
    //frequency: string, //deprecated
    runOnce?: boolean,
    created?: number,
    modified?: number
}
