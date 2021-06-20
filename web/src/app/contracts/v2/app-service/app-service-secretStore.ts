import { Timestamps } from '../../timestamps';
import { Authentication } from './app-service-authentication';

export interface SecretStore extends Timestamps {
    Type: string,
    Host: string,
    Port: number,
    Path: string,
    Protocol: string,
    Namespace: string,
    RootCaCertPath: string,
    ServerName: string,
    Authentication: Authentication,
    AdditionalRetryAttempts: string,
    RetryWaitPeriod: string,
    TokenFile: string
}