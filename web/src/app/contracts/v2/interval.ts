import { Versionable } from "./common/versionable";

export interface Interval extends Versionable {
    id: string,
    name: string,
    start: string,
    end: string,
    frequency: string,
    runOnce: boolean
}
