import { BaseRequest } from "../common/base-request";
import { ProvisionWatcher } from "../provision-watcher";

export interface ProvisionWatcherRequest extends BaseRequest {
    provisionWatcher: ProvisionWatcher
}
