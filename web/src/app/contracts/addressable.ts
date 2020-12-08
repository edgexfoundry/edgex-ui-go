import { Timestamps } from './timestamps';

export interface Addressable extends Timestamps {
    id: string,
    name: string,
    protocol?: string,
    method?: string,
    address?: string,
    port?: number,
    path?: string,
    publisher?: string,
    user?: string,
    password?: string,
    topic?: string
}
