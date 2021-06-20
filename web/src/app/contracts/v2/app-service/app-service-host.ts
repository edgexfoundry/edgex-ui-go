import { Timestamps } from '../../timestamps';

export interface Host extends Timestamps {
    Host: string,
    Port: number,
    Protocol: string
}