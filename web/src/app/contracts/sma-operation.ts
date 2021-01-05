import { Action } from "./action";

export interface SmaOperation {
    action: string,
    services: string[],
    params?: string[]
}
