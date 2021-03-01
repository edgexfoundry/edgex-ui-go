import { BaseResponse } from "../common/base-response";
import { Subscription } from "../subscription";

export interface SubscriptionResponse extends BaseResponse {
    subscription: Subscription
}

export interface MultiSubscriptionResponse extends BaseResponse {
    subscriptions: Subscription[]
}
