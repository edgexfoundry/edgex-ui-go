import { Timestamps } from './timestamps';

export interface DeviceProfile extends Timestamps {
    id: string,
    name: string,
    description?: string,
    manufacturer?: string,
    model?: string,
    labels?: string[]
    // deviceResources
    // deviceCommands
    // coreCommands
}
