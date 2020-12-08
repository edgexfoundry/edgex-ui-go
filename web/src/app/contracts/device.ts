import { DeviceService } from './device-service';
import { Timestamps } from './timestamps';

export interface Device extends Timestamps {
    id: string,
    name: string,
    description: string,
    adminState: string,
    operatingState: string,
    labels: string[],
    lastConnected: number,
    lastReported: number,
    deviceService: DeviceService
}