import { Versionable } from "./versionable";

export interface BaseResponse extends Versionable {
    requestId: string,
    message: string,
    statusCode: number
}

export interface BaseWithIdResponse extends BaseResponse {
    id: string
}

// Now only be used for system agent health check
export interface BaseWithServiceNameResponse extends BaseResponse {
    serviceName: string
}

// Now only be used for system agent metric check with docker executer 
export interface BaseWithMetricsResponse extends BaseResponse {
    serviceName: string,
    metrics: any
}

// Now only be used for system agent config check 
export interface BaseWithConfigResponse extends BaseResponse {
    serviceName: string,
    config: any
}
