import { Subject } from 'rxjs';
import { ProcessInfo } from './process-info';

export interface ProcessListeners {
    [key: string]: Subject<ProcessInfo>;
}
