import { BaseResponse } from "../common/base-response";
import { Interval } from "../interval";

export interface IntervalActionResponse extends BaseResponse {
    interval: Interval
}

export interface MultiIntervalActionResponse extends BaseResponse {
    intervals: Interval[]
}
