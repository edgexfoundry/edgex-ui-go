import { Timestamps } from '../../timestamps';
import { EdgexMessageBus } from './app-service-edgexmessagebus';
import { ExternalMqtt } from './app-service-externalmqtt';

export interface Trigger extends Timestamps {
    Type: string,
    SubscribeTopics: string,
    PublishTopic: string,
    EdgexMessageBus: EdgexMessageBus,
    ExternalMqtt: ExternalMqtt
}