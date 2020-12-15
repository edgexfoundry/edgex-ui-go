import { AutoEvent } from './auto-event';
import { DeviceService } from './device-service';
import { DeviceProfile } from './device-profile';
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
    profile: DeviceProfile,
    autoEvents?: AutoEvent,
    location?: any,
    protocols?: any
}