import { AutoEvent } from './auto-event';
import { DeviceService } from './device-service';
import { Timestamps } from './timestamps';

export interface Device extends Timestamps {
    id: string,
    name: string,
    description?: string,
    adminState: string,
    operatingState: string,
    labels: string[],
    lastConnected: number,
    lastReported: number,
    deviceService: DeviceService,
    profile?: any,
    autoEvents?: AutoEvent,
    location?: any,
    protocols?: any
}