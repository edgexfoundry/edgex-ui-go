export interface CoreCommand {
    name: string,
    get: boolean,
    set: boolean,
    path: string,
    url: string
}

export interface DeviceCoreCommand {
    deviceName: string,
    profileName: string,
    coreCommands: CoreCommand[]
}
