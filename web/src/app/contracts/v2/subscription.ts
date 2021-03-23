import { Versionable } from "./common/versionable";
import { Address } from './address';

export interface Subscription extends Versionable {
    id: string,
    name: string,
    description: string,
    channels: Address[],
    receiver: string,
    categories: string[],
    labels: string[],
    resendLimit: number,
    resendInterval: string,
    created: number,
    modified: number
}
