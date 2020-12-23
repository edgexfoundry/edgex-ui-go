import { Addressable } from './addressable';
import { Timestamps } from './timestamps';

export interface DeviceService extends Timestamps {
    id: string,
    name: string,
    description: string,
    adminState: string,
    operatingState: string,
    labels: string[],
    addressable: Addressable,
    lastConnected: number,
    lastReported: number
}
