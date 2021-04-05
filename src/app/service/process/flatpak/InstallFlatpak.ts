import { Process } from '../process';
import { AppOutletChildProcess } from '../../../util/app-outlet-child-process';
import { Application } from '../../../model/application.model';

export class InstallFlatpak extends Process {
    constructor(
        childProcess: AppOutletChildProcess,
        application: Application,
        private onProcessFinishedCallback: (process: Process) => void,
    ) {
        super(childProcess, application);
        this.isIndefinite = true;
    }

    onProcessFinished(process: Process): void {
        this.onProcessFinishedCallback(process);
    }

    setupProcess(): void {
        this.setCommand('flatpak', [
            'install',
            'flathub',
            this.application.id,
            '-y',
        ]);
    }
}
