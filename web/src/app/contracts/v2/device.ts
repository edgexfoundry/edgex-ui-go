import { AutoEvent } from './auto-event';
import { Versionable } from './common/versionable';
import { DBTimestamp } from './common/db-timestamp';

export interface Device extends Versionable, DBTimestamp {
    id: string,
    name: string,
    description: string,
    adminState: string,   //oneof='LOCKED' 'UNLOCKED'
    operatingState: string,  //oneof='UP' 'DOWN' 'UNKNOWN'
    lastConnected?: number,
    lastReported?: number,
    labels?: string[],
    location?: {} | any,
    serviceName: string,
    profileName: string,
    autoEvents: AutoEvent[],
    protocols: any
}
