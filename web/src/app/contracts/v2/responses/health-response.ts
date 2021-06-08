import { BaseResponse } from "../common/base-response";

export interface HealthResponse extends BaseResponse  {
    health: any //map[string]string
}
