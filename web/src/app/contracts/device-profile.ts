<<<<<<< HEAD
import { Command } from './command';
import { DeviceResource } from './device-resource';
import { ProfileResource } from './profile-resource';
=======
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
import { Timestamps } from './timestamps';

export interface DeviceProfile extends Timestamps {
    id: string,
    name: string,
    description?: string,
    manufacturer?: string,
    model?: string,
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
}
