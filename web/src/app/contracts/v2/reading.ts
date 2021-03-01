import { Versionable } from "./common/versionable";

export interface BaseReading extends Versionable, SimpleReading, BinaryReading {
    id: string,
    created: number,
    origin: number,
    deviceName: string,
    resourceName: string,
    profileName: string,
    valueType: string
}

interface SimpleReading {
    value: string
} 

interface  BinaryReading {
    binaryValue: any[],
    mediaType: string
}