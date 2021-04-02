import { Timestamps } from './timestamps';

export interface Options extends Timestamps {
    DATASOURCE: string,
    FORMAT: string,
    TYPE: string,
    KEY: string
}