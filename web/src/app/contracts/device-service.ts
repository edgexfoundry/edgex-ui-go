<<<<<<< HEAD
import { Addressable } from './addressable';
import { Timestamps } from './timestamps';
=======
import { Timestamps } from './timestamps'
>>>>>>> d08a9c7... init scaffold

export interface DeviceService extends Timestamps {
    id: string,
    name: string,
    description: string,
    adminState: string,
    operatingState: string,
    labels: string[],
<<<<<<< HEAD
    addressable: Addressable,
    lastConnected: number,
    lastReported: number
}
=======
    lastConnected: number,
    lastReported: number
}
>>>>>>> d08a9c7... init scaffold
