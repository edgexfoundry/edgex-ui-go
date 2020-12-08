import { Timestamps } from './timestamps'

export interface DeviceService extends Timestamps {
    id: string,
    name: string,
    description: string,
    adminState: string,
    operatingState: string,
    labels: string[],
    lastConnected: number,
    lastReported: number
}