import { Response } from "../../response";
import { BaseReading } from "../reading";

export interface ReadingResponse extends Response {
    reading: BaseReading
}

export interface MultiReadingResponse extends Response {
    readings: BaseReading[]
}
