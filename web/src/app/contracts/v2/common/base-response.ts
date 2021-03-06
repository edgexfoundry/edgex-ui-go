import { Versionable } from "./versionable";

export interface BaseResponse extends Versionable {
    requestId: string,
    message: any,
    statusCode: number
}

export interface BaseWithIdResponse extends BaseResponse {
    id: string
}
