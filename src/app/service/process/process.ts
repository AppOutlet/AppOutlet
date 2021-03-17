export abstract class Process {
    abstract start(): void;

    abstract update(): void;

    abstract close(): void;

    abstract getApplicationId(): string;

    abstract getProcessStatus(): ProcessStatus;
}

export enum ProcessStatus {
    IDLE,
    RUNNING,
    FINISHED,
}
