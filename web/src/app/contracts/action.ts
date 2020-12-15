<<<<<<< HEAD
<<<<<<< HEAD
import { Response } from "./response";

=======
>>>>>>> 8f9c4f5... add part of code models with using ts, especially device , device service , command .etc.
=======
import { Response } from "./response";

>>>>>>> 66d2192... Device and DeviceService program models completed
export interface Action {
    path?: string,
    responses?: Response[],
    url?: string,
}
