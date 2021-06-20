import { Timestamps } from '../../timestamps';

export interface Optional extends Timestamps {
    AutoReconnect: string,
    ClientId: string,
    ConnectTimeout: string,
    KeepAlive: string,
    Password: string,
    Qos: string,
    Retained: string,
    SkipCertVerify: string,
    Username: string,
    authmode: string,
    secretname: string
}