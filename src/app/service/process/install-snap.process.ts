import { Process, ProcessStatus } from './process';
import { ChildProcess } from 'child_process';
import { Application } from '../../model/application.model';

export class InstallSnap implements Process {
    private processStatus = ProcessStatus.IDLE;

    constructor(
        private childProcess: ChildProcess,
        private application: Application,
    ) {}

    close(): void {}

    start(): void {}

    update(): void {}

    getApplicationId(): string {
        return this.application.id;
    }

    getProcessStatus(): ProcessStatus {
        return this.processStatus;
    }
}
