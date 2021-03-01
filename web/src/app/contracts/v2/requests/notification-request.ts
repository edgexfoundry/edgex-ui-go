import { Notification } from "../notification";
import { BaseRequest } from "../common/base-request";

export interface NotificationRequest extends BaseRequest {
    notification: Notification
}
