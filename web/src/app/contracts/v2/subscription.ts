import { Versionable } from "./common/versionable";

export interface Subscription extends Versionable {
    id: string,
    name: string,
    description: string,
    channels: Channel[],
    receiver: string,
    categories: string[],
    labels: string[],
    resendLimit: number,
    resendInterval: string,
    created: number,
    modified: number
}

interface Channel {
    type: string,
    emailAddresses: string[],
    url: string
}
