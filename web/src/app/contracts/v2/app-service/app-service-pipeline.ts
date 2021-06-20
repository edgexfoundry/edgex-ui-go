import { Timestamps } from '../../timestamps';

export interface Pipeline extends Timestamps {
    ExecutionOrder: string,
    UseTargetTypeOfByteArray:boolean
    Functions:any[]
}