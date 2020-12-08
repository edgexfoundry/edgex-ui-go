import { Get } from './get';
import { Put } from './put';
import { Timestamps } from './timestamps';

export interface Command extends Timestamps {
    id: string,
    name: string,
    get?: Get,
    put?: Put
}
