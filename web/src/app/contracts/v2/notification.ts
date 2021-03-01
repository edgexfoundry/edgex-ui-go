import { Versionable } from "./common/versionable";

export interface Notification extends Versionable {
    id: string,
    category:string,
    labels: string[],
    content: string,
    contentType: string,
    description: string,
    sender: string,
    severity: string,
    status: string,
    created: number,
    modified: number
}
