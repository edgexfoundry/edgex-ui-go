import { BaseRequest } from "../common/base-request";

export interface OperationRequest extends BaseRequest {
    serviceName: string, //required
    action: string, // oneof='start' 'stop' 'restart'
}
