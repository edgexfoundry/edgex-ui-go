import { Action } from "./action";

export interface SmaOperation {
<<<<<<< HEAD
<<<<<<< HEAD
    action: string,
    services: string[],
    params?: string[]
=======
    action: Action,
    services: string[]
>>>>>>> d6fa576... Add sma operation interface
=======
    action: string,
    services: string[],
    params?: string[]
>>>>>>> d5a4f31... update interface with action type changed to string and add params field
}
