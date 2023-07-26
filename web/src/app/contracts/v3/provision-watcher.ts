import { Versionable } from './common/versionable';
import { DBTimestamp } from './common/db-timestamp';

export interface ProvisionWatcher extends Versionable, DBTimestamp {
    name: string,
    labels?: string[],
    identifiers:{
        address:string,
        port:string,
    },
    blockingidentifiers:{
        port:string[],
    }
    profileName: string,
    serviceName: string,
    adminState: string,
    DiscoveredDevice:{
        adminState: string,
    }
}
