import { Timestamps } from '../../timestamps';

export interface Service extends Timestamps {
    BootTimeout: string,
    CheckInterval: string,
    Host: string,
    HTTPSCert: string,
    HTTPSKey: string,
    ServerBindAddr: string,
    Port: string,
    Protocol: string,
    StartupMsg: string,
    ReadMaxLimit: number,
    Timeout: string
}