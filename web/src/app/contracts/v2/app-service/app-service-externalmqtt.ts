import { Timestamps } from '../../timestamps';

export interface ExternalMqtt extends Timestamps {
    Url: string,
    ClientId: string,
    ConnectTimeout: string,
    AutoReconnect: boolean,
    KeepAlive: number,
    QoS: number,
    Retain: boolean,
    SkipCertVerify: boolean,
    SecretPath: string,
    AuthMode: string
}