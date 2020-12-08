<<<<<<< HEAD
import { AutoEvent } from './auto-event';
import { DeviceService } from './device-service';
import { DeviceProfile } from './device-profile';
=======
import { DeviceService } from './device-service';
>>>>>>> d08a9c7... init scaffold
import { Timestamps } from './timestamps';

export interface Device extends Timestamps {
    id: string,
    name: string,
<<<<<<< HEAD
    description?: string,
=======
    description: string,
>>>>>>> d08a9c7... init scaffold
    adminState: string,
    operatingState: string,
    labels: string[],
    lastConnected: number,
    lastReported: number,
<<<<<<< HEAD
    service: DeviceService,
    profile: DeviceProfile,
    autoEvents: AutoEvent[],
    location?: any,
    protocols: any
=======
    deviceService: DeviceService
>>>>>>> d08a9c7... init scaffold
}