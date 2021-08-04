import { Pipeline } from './pipeline';
import { StoreAndForward } from  './store-and-forward';
import { InsecureSecrets } from './insecure-secrets';
import { Trigger } from './trigger';

export interface Writable {
    Pipeline: Pipeline,
    StoreAndForward: StoreAndForward,
    InsecureSecrets: InsecureSecrets
}
