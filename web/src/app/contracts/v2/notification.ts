import { DBTimestamp } from "./common/db-timestamp";
import { Versionable } from "./common/versionable";

export interface Notification extends Versionable, DBTimestamp {
    id: string,
    category: string,
    labels: string[],
    content: string,
    contentType: string,
    description: string,
    sender: string,
    severity: string, //oneof='MINOR' 'NORMAL' 'CRITICAL'
    status: string //oneof='NEW' 'PROCESSED' 'ESCALATED'
}
