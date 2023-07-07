import { Versionable } from "./versionable";

export interface BaseRequest extends Versionable {
    requestId?: string
}
