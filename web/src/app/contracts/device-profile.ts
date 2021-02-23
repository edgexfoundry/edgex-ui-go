import { Command } from './command';
import { DeviceResource } from './device-resource';
import { Timestamps } from './timestamps';

export interface DeviceProfile extends Timestamps {
    id: string,
    name: string,
    description?: string,
    manufacturer?: string,
    model?: string,
    labels?: string[],
    deviceResources: DeviceResource[]
    deviceCommands: DeviceProfile[],
    coreCommands: Command[]
}
