import { Timestamps } from '../../timestamps';

export interface Database extends Timestamps {
    Type: string,
    Host: string,
    Port: number,
    Timeout: string,
    MaxIdle: number,
    BatchSize: number
}