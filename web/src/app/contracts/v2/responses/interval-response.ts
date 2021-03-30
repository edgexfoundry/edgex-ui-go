import { BaseResponse } from "../common/base-response";
import { Interval } from "../interval";

export interface IntervalResponse extends BaseResponse {
    interval: Interval
}

export interface MultiIntervalResponse extends BaseResponse {
    intervals: Interval[]
    
}
