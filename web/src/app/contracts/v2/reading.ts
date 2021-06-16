import { Versionable } from "./common/versionable";

export interface BaseReading extends Versionable, SimpleReading, BinaryReading {
    id: string,
    origin: number,
    deviceName: string,
    resourceName: string,
    profileName: string,
    valueType: string
}

export interface SimpleReading {
    value: string
} 

export interface  BinaryReading {
    binaryValue: any,
    mediaType: string
}