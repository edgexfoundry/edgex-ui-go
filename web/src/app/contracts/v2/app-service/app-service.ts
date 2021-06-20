import { AppServiceConfig } from './app-service-config';
import { Timestamps } from '../../timestamps';

export interface AppService extends Timestamps {
    apiVersion: string,
    config:AppServiceConfig
}