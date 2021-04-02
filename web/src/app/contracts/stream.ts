import { StreamFields } from './stream-fields';
import { Options } from './stream-options';
import { Timestamps } from './timestamps';

export interface Stream extends Timestamps {
    Name: string;
    StreamFields?: StreamFields[],
    Options: Options
}