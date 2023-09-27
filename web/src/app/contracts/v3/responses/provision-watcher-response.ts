import { BaseResponse } from "../common/base-response";
import { ProvisionWatcher } from "../provision-watcher";

export interface ProvisionWatcherResponse extends BaseResponse {
    provisionWatcher: ProvisionWatcher
}

export interface MultiProvisionWatcherResponse extends BaseResponse {
    provisionWatchers: ProvisionWatcher[]
}