import { Timestamps } from '../../timestamps';

export interface Authentication extends Timestamps {
    AuthType: string,
    AuthToken: string
}