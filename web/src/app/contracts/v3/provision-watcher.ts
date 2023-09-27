import { Versionable } from './common/versionable';
import { DBTimestamp } from './common/db-timestamp';

export interface ProvisionWatcher extends Versionable, DBTimestamp {
    id:string,
    name: string,
    labels?: string[],
    identifiers:{
        address:string,
        port:string,
    },
    blockingIdentifiers:{
        port:string[],
    }
    serviceName: string,
    adminState: string,
    discoveredDevice:{
        profileName: string,
        adminState: string,
    }
}
