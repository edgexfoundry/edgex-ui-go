import { BaseResponse } from "../common/base-response";
import { IntervalAction } from "../interval-action";

export interface IntervalActionResponse extends BaseResponse {
    action: IntervalAction
    
}

export interface MultiIntervalActionResponse extends BaseResponse {
    actions: IntervalAction[]
}
