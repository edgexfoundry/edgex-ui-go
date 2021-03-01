import { BaseResponse } from "../common/base-response";
import { IntervalAction } from "../interval-action";

export interface IntervalResponse extends BaseResponse {
    action: IntervalAction
}

export interface MultiIntervalResponse extends BaseResponse {
    actions: IntervalAction[]
}
