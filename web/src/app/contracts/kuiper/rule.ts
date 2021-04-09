import { Timestamps } from '../timestamps';
import { Options } from './options'; 

export interface Rule extends Timestamps {
    id: string,
    status: string,
    sql: string,
    actions: any[],
    options: Options
}