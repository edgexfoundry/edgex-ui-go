<<<<<<< HEAD
<<<<<<< HEAD
import { Command } from './command';
import { DeviceResource } from './device-resource';
import { ProfileResource } from './profile-resource';
<<<<<<< HEAD
=======
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
=======
import { Command } from './command';
import { DeviceResource } from './device-resource';
>>>>>>> 66d2192... Device and DeviceService program models completed
=======
>>>>>>> 3d9b306... Update DeviceProfile interface
import { Timestamps } from './timestamps';

export interface DeviceProfile extends Timestamps {
    id: string,
    name: string,
    description?: string,
    manufacturer?: string,
    model?: string,
<<<<<<< HEAD
<<<<<<< HEAD
    labels?: string[],
    deviceResources: DeviceResource[]
    deviceCommands: ProfileResource[],
    coreCommands: Command[]
=======
    labels?: string[]
    // deviceResources
    // deviceCommands
    // coreCommands
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
=======
    labels?: string[],
    deviceResources: DeviceResource[]
    deviceCommands: ProfileResource[],
    coreCommands: Command[]
>>>>>>> 66d2192... Device and DeviceService program models completed
}
