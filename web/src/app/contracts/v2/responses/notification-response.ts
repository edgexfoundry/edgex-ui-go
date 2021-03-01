import { Notification } from "../notification";
import { BaseResponse } from "../common/base-response";

export interface NotificationResponse extends BaseResponse {
    notification: Notification
}

export interface MultiNotificationResponse extends BaseResponse {
    notifications: Notification[]
}
