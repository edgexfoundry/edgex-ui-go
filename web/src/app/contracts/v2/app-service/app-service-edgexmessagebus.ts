import { Timestamps } from '../../timestamps';
import { Host } from './app-service-host';
import { Optional } from './app-service-optional';

export interface EdgexMessageBus extends Timestamps {
    PublishHost: Host,
    SubscribeHost:Host,
    Type: string,
    Optional: Optional
}