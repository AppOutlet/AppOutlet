import { Process, ProcessStatus } from './process';
import { Application } from '../../model/application.model';
import { AppOutletChildProcess } from '../../util/app-outlet-child-process';
import { ProcessInfo } from './process-info';

export class InstallSnap extends Process {
    private processStatus = ProcessStatus.IDLE;

    constructor(
        private childProcess: AppOutletChildProcess,
        private application: Application,
        private onProcessFinished: (process: Process) => void,
    ) {
        super();
        this.isIndefinite = true;
    }

    close(): void {
        process?.abort();
    }

    start(): void {
        this.processStatus = ProcessStatus.RUNNING;

        const command = this.generateInstallCommand();
        const process = this.childProcess.spawn('pkexec', command);

        process.stdout.on('data', (data: Buffer) => {
            const output = data.toString();
            this.processOutput(output);
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

    private generateInstallCommand(): string[] {
        const commands = ['snap', 'install'];

        this.addConfinement(commands);
        this.addPackageName(commands);

        console.log(commands.join(' '));
        return commands;
    }

    private addConfinement(commands: string[]): void {
        if (
            this.application.confinement === 'classic' ||
            this.application.confinement === 'devmode'
        ) {
            commands.push(`--${this.application.confinement}`);
        }
    }

    private addPackageName(commands: string[]): void {
        if (this.application.packageName) {
            commands.push(this.application.packageName);
        }
    }

    private processOutput(output: string): void {
        this.stdout.push(output);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    update(): void {}

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
}
