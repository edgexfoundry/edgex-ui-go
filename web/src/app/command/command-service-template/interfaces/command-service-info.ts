import { CoreCommandParameter, CoreCommand } from '../../../contracts/v3/core-command';

export interface CommandServiceInfo {
    httpMethod: string,
    host: string,
    port: number
    path: string,
    pushEventOfGetCmdParamter: string, // 'true' or 'false'
    returnEventOfGetCmdParamter: string, // 'true' or 'false'
    parametersOfPutCommand: CoreCommandParameter[] // http put method
}
