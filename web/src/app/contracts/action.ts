import { Response } from "./response";

export interface Action {
    path?: string,
    responses?: Response[],
    url?: string,
}
