import { Command } from './command';
import { DeviceResource } from './device-resource';
import { ProfileResource } from './profile-resource';
import { Timestamps } from './timestamps';

export interface DeviceProfile extends Timestamps {
    id: string,
    name: string,
    description?: string,
    manufacturer?: string,
    model?: string,
    labels?: string[],
    deviceResources: DeviceResource[]
    deviceCommands: ProfileResource[],
    coreCommands: Command[]
}
