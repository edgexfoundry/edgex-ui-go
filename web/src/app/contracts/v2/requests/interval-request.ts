import { BaseRequest } from "../common/base-request";
import { Interval } from "../interval";


export interface IntervalRequest extends BaseRequest {
    interval: Interval
}
