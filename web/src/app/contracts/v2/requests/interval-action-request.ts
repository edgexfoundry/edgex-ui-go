import { BaseRequest } from "../common/base-request";
import { IntervalAction } from "../interval-action";

export interface IntervalActionRequest extends BaseRequest {
    action: IntervalAction
}
