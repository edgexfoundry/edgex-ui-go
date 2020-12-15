<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
import { AutoEvent } from './auto-event';
import { DeviceService } from './device-service';
import { DeviceProfile } from './device-profile';
<<<<<<< HEAD
=======
import { DeviceService } from './device-service';
>>>>>>> d08a9c7... init scaffold
=======
>>>>>>> 66d2192... Device and DeviceService program models completed
import { Timestamps } from './timestamps';

export interface Device extends Timestamps {
    id: string,
    name: string,
<<<<<<< HEAD
<<<<<<< HEAD
    description?: string,
=======
    description: string,
>>>>>>> d08a9c7... init scaffold
=======
    description?: string,
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
    adminState: string,
    operatingState: string,
    labels: string[],
    lastConnected: number,
    lastReported: number,
<<<<<<< HEAD
<<<<<<< HEAD
    service: DeviceService,
    profile: DeviceProfile,
    autoEvents: AutoEvent[],
    location?: any,
    protocols: any
=======
    deviceService: DeviceService
>>>>>>> d08a9c7... init scaffold
=======
    deviceService: DeviceService,
    profile: DeviceProfile,
    autoEvents?: AutoEvent,
    location?: any,
    protocols?: any
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
}