import { ProcessInfo } from './process-info';
import { AppOutletChildProcess } from '../../util/app-outlet-child-process';
import { Application } from '../../model/application.model';

export abstract class Process {
    private processStatus = ProcessStatus.IDLE;
    private command?: string;
    private arguments?: string[];

    protected stdout: string[] = [];
    protected stderr: string[] = [];

    isIndefinite = true;
    completePercentage = 0;

    protected constructor(
        private childProcess: AppOutletChildProcess,
        protected application: Application,
    ) {
        this.setupProcess();
    }

    start(): void {
        this.processStatus = ProcessStatus.RUNNING;

        if (this.command && this.arguments) {
            const process = this.childProcess.spawn(
                this.command,
                this.arguments,
            );

            process.stdout.on('data', (data: Buffer) => {
                const output = data.toString();
                this.stdout.push(output);
            });

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
    }

    protected setCommand(command: string, args: string[]): void {
        this.command = command;
        this.arguments = args;
    }

    abstract setupProcess(): void;

    getApplicationId(): string {
        return this.application.id;
    }

    getProcessStatus(): ProcessStatus {
        return this.processStatus;
    }

    getProcessInfo(): ProcessInfo {
        return {
            applicationId: this.getApplicationId(),
            processStatus: this.getProcessStatus(),
        };
    }

    abstract onProcessFinished(process: Process): void;
}

export enum ProcessStatus {
    IDLE,
    RUNNING,
    FINISHED,
}
