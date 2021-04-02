import { Timestamps } from './timestamps';

export interface Options extends Timestamps {
    isEventTime: boolean,
    lateTolerance:number,
    concurrency:number,
    bufferLength:number,
    sendMetaToSink:boolean,
    qos:number,
    checkpointInterval:number
}