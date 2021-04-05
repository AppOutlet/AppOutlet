import { Process } from '../process';
import { AppOutletChildProcess } from '../../../util/app-outlet-child-process';
import { Application } from '../../../model/application.model';

export class UninstallSnap extends Process {
    constructor(
        childProcess: AppOutletChildProcess,
        application: Application,
        private onProcessFinishedCallback: (process: Process) => void,
    ) {
        super(childProcess, application);
    }

    setupProcess(): void {
        const command: string[] = [
            'snap',
            'remove',
            `${this.application.packageName}`,
        ];

        this.setCommand('pkexec', command);
    }

    onProcessFinished(process: Process): void {
        this.onProcessFinishedCallback?.(process);
    }
}
