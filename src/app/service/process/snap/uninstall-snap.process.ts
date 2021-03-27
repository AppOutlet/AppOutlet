import { Process, ProcessStatus } from '../process';
import { ProcessInfo } from '../process-info';
import { AppOutletChildProcess } from '../../../util/app-outlet-child-process';
import { Application } from '../../../model/application.model';

export class UninstallSnap extends Process {
    private processStatus = ProcessStatus.IDLE;

    constructor(
        private childProcess: AppOutletChildProcess,
        private application: Application,
        private onProcessFinished: (process: Process) => void,
    ) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close(): void {}

    getApplicationId(): string {
        return this.application.id;
    }

    getProcessInfo(): ProcessInfo {
        return {
            applicationId: this.getApplicationId(),
            processStatus: this.processStatus,
        };
    }

    getProcessStatus(): ProcessStatus {
        return this.processStatus;
    }

    start(): void {
        this.processStatus = ProcessStatus.RUNNING;

        const command: string[] = [
            'snap',
            'remove',
            `${this.application.packageName}`,
        ];
        const process = this.childProcess.spawn('pkexec', command);

        process.on('error', (data: Buffer) => {
            console.error(`ps stderr: ${data.toString()}`);
            this.stderr.push(data.toString());
        });

        process.stderr.on('data', (data: Buffer) => {
            console.error(`ps stderr: ${data.toString()}`);
            this.stderr.push(data.toString());
        });

        process.on('close', () => {
            this.processStatus = ProcessStatus.FINISHED;
            this.onProcessFinished(this);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    update(): void {}
}
