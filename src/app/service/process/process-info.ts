import { ProcessStatus } from './process';

export interface ProcessInfo {
    applicationId: string;
    processStatus: ProcessStatus;
    completePercentage?: number;
}
