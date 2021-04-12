import { Process } from '../process';
import { AppOutletChildProcess } from '../../../util/app-outlet-child-process';
import { Application } from '../../../model/application.model';

export class UninstallFlatpak extends Process {
    constructor(
        childProcess: AppOutletChildProcess,
        application: Application,
        private onProcessFinishedCallback: (process: Process) => void,
    ) {
        super(childProcess, application);
    }

    setupProcess(): void {
        this.setCommand('flatpak', ['uninstall', this.application.id, '-y']);
    }

    onProcessFinished(process: Process): void {
        this.onProcessFinishedCallback(process);
    }
}
