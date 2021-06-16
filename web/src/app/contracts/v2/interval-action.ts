import { Address } from './address';
import { Versionable } from './common/versionable';
import { DBTimestamp } from './common/db-timestamp';

export interface IntervalAction extends Versionable, DBTimestamp {
    id: string,
    name: string,
    intervalName: string, 
    address: Address
    content: string,
    contentType: string,
    adminState: string //oneof='LOCKED' 'UNLOCKED'
}
