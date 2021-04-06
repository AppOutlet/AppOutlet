import { Process } from '../process';
import { AppOutletChildProcess } from '../../../util/app-outlet-child-process';
import { Application } from '../../../model/application.model';
import { ProcessInfo } from '../process-info';

export class InstallFlatpak extends Process {
    constructor(
        childProcess: AppOutletChildProcess,
        application: Application,
        private onProcessFinishedCallback: (process: Process) => void,
        private onUpdateProcessListener: (processInfo: ProcessInfo) => void,
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

    protected onUpdate(update: string): void {
        const outputFragment = update.split(' ');
        const steps = this.getNumberSteps(outputFragment);
        const installationPercent = this.getPercentage(outputFragment);

        if (!installationPercent) {
            return;
        }

        const base =
            (steps.currentStep / steps.maxStep - 1 / steps.maxStep) * 100;
        const currentStepPercentage = installationPercent / steps.maxStep;

        this.completePercentage = base + currentStepPercentage;

        this.onUpdateProcessListener(this.getProcessInfo());
    }

    private getNumberSteps(outputFragment: string[]): Steps {
        const stepsRegex = /\d+\/\d+…/;
        const fragment = outputFragment.find((outputItem) => {
            return stepsRegex.test(outputItem);
        });
        if (!fragment) {
            return {
                currentStep: 1,
                maxStep: 1,
            };
        }

        const fragmentArray = fragment.replace('…', '').split('/');
        return {
            currentStep: Number(fragmentArray[0]),
            maxStep: Number(fragmentArray[1]),
        };
    }

    private getPercentage(outputFragment: string[]): number | null {
        const stepsRegex = new RegExp('\\d+%');
        const fragment = outputFragment.find((outputItem) =>
            stepsRegex.test(outputItem),
        );

        if (!fragment) {
            return null;
        }

        return Number(fragment.replace('%', ''));
    }
}

interface Steps {
    currentStep: number;
    maxStep: number;
}
