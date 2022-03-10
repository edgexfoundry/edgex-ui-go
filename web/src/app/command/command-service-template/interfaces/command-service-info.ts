import { CoreCommandParameter, CoreCommand } from '../../../contracts/v2/core-command';

export interface CommandServiceInfo {
    httpMethod: string,
    host: string,
    port: number
    path: string,
    pushEventOfGetCmdParamter: string, // 'yes' or 'no'
    returnEventOfGetCmdParamter: string, // 'yes' or 'no'
    parametersOfPutCommand: CoreCommandParameter[] // http put method
}