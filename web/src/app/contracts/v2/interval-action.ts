import { Address } from "./address";
import { Versionable } from "./common/versionable";

export interface IntervalAction extends Versionable {
    id: string,
    name: string,
    intervalName: string, 
    created: number,
    modified: number
    address: Address
}
