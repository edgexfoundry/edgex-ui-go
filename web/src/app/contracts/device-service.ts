<<<<<<< HEAD
<<<<<<< HEAD
import { Addressable } from './addressable';
import { Timestamps } from './timestamps';
=======
import { Timestamps } from './timestamps'
>>>>>>> d08a9c7... init scaffold
=======
import { Addressable } from './addressable';
import { Timestamps } from './timestamps';
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.

export interface DeviceService extends Timestamps {
    id: string,
    name: string,
    description: string,
    adminState: string,
    operatingState: string,
    labels: string[],
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
    addressable: Addressable,
    lastConnected: number,
    lastReported: number
}
<<<<<<< HEAD
=======
    lastConnected: number,
    lastReported: number
}
>>>>>>> d08a9c7... init scaffold
=======
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
