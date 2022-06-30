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
    completePercentage?: number;

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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            process.stdout.on('data', (data: any) => {
                const output = data.toString();
                this.stdout.push(output);
                this.onUpdate(output);
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            process.on('error', (data: any) => {
                console.error(`ps stderr: ${data.toString()}`);
                this.stderr.push(data.toString());
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            process.stderr.on('data', (data: any) => {
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
            completePercentage: this.completePercentage,
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected onUpdate(update: string): void {
        /* no-op */
    }

    abstract onProcessFinished(process: Process): void;
}

export enum ProcessStatus {
    IDLE,
    RUNNING,
    FINISHED,
}
