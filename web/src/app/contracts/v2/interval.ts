import { Versionable } from './common/versionable';
import { DBTimestamp } from './common/db-timestamp';

export interface Interval extends Versionable, DBTimestamp {
    id: string,
    name: string,
    start?: string,
    end?: string,
    interval: string, // replace frequency

    runOnce?: boolean //deprecated
}
