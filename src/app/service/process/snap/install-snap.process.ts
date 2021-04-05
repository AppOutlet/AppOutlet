import { Process } from '../process';
import { Application } from '../../../model/application.model';
import { AppOutletChildProcess } from '../../../util/app-outlet-child-process';

export class InstallSnap extends Process {
    constructor(
        childProcess: AppOutletChildProcess,
        application: Application,
        private onProcessFinishedCallback: (process: Process) => void,
    ) {
        super(childProcess, application);
        this.isIndefinite = true;
    }

    setupProcess(): void {
        this.setCommand('pkexec', this.generateInstallCommand());
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

    onProcessFinished(process: Process): void {
        this.onProcessFinishedCallback?.(process);
    }
}
