import { Timestamps } from '../../timestamps';

export interface Registry extends Timestamps {
    Host: string,
    Port: number,
    Type: string
}