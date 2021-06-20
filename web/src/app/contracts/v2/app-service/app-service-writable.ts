import { Pipeline } from './app-service-pipeline';
import { StoreAndForward } from './app-service-storeandforward';
import { Timestamps } from '../../timestamps';

export interface Writable extends Timestamps {
    LogLevel: string,
    Pipeline:Pipeline,
    StoreAndForward:StoreAndForward,
    InsecureSecrets:any[]
}