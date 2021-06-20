import { Timestamps } from '../../timestamps';
import { Writable } from './app-service-writable';
import { Registry } from './app-service-registry';
import { Service } from './app-service-service';
import { Trigger } from './app-service-trigger';
import { Database } from './app-service-database';
import { SecretStore } from './app-service-secretStore';

export interface AppServiceConfig extends Timestamps {
    Writable: Writable,
    Registry:Registry,
    Service:Service,
    Trigger:Trigger,
    ApplicationSettings:any[],
    Clients:any[],
    Database:Database,
    SecretStore:SecretStore
}