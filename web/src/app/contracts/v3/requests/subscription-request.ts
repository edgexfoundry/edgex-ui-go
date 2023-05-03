import { Subscription } from "../subscription";
import { BaseRequest } from "../common/base-request";

export interface SubscriptionRequest extends BaseRequest {
    subscription: Subscription
}
