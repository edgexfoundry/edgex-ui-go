import { Command } from "../command";
import { DeviceResource } from "../device-resource";
import { Versionable } from "./common/versionable";
import { DeviceCommand } from "./device-command";

export interface DeviceProfile extends Versionable {
    id: string,
    name: string,
    manufacturer: string,
    description: string,
    model: string,
    labels: string[],
    deviceResources: DeviceResource[],
    deviceCommands: DeviceCommand[],
    coreCommands: Command[]
}
