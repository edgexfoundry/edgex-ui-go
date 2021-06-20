import { Timestamps } from '../../timestamps';

export interface StoreAndForward extends Timestamps {
    Enabled: boolean,
    RetryInterval:string,
    MaxRetryCount:number
}