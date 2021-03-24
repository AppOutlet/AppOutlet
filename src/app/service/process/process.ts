import { ProcessInfo } from './process-info';

export abstract class Process {
    protected stdout: string[] = [];
    protected stderr: string[] = [];

    isIndefinite = true;
    completePercentage = 0;

    abstract start(): void;

    abstract update(): void;

    abstract close(): void;

    abstract getApplicationId(): string;

    abstract getProcessStatus(): ProcessStatus;

    abstract getProcessInfo(): ProcessInfo;
}

export enum ProcessStatus {
    IDLE,
    RUNNING,
    FINISHED,
}
