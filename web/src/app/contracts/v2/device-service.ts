import { Versionable } from './common/versionable';
import { DBTimestamp } from './common/db-timestamp';

export interface DeviceService extends Versionable, DBTimestamp {
    id: string,
    name: string,
    description: string,
    lastConnected: number,
    lastReported: number,
    labels: string[],
    baseAddress: string,
    adminState: string //oneof='LOCKED' 'UNLOCKED'
}
