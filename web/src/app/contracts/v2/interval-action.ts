import { Versionable } from "./common/versionable";

export interface IntervalAction extends Versionable {
    id: string,
    name: string,
    intervalName: string,
    protocol: string,
    host: string,
    port: number,
    path: string,
    parameters: string,
    httpMethod: string,
    user: string,
    password: string,
    publisher: string,
    target: string,
    topic: string,
    created: number,
    modified: number
}
