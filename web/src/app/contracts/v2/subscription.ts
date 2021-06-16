import { Versionable } from "./common/versionable";
import { Address } from './address';
import { DBTimestamp } from "./common/db-timestamp";

export interface Subscription extends Versionable, DBTimestamp {
    id: string,
    name: string,
    description: string,
    channels: Address[],
    receiver: string,
    categories: string[],
    labels: string[],
    resendLimit: number,
    resendInterval: string,
    adminState: string //oneof='LOCKED' 'UNLOCKED'
}
