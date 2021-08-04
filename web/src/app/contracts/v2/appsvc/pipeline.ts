import { Functions } from "./functions";

export interface Pipeline {
    ExecutionOrder: string, //multiple values split by comma
    Functions: Functions
}