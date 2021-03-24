import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import * as PackageType from '../../../../core/model/PackageType';
import { WindowRef } from '../../util/window-ref';
import { Process } from './process';
import { InstallSnap } from './install-snap.process';
import { ProcessQueue } from './ProcessQueue';
import { ApplicationStatus } from '../../model/application-status';
import { AppOutletChildProcess } from '../../util/app-outlet-child-process';

@Injectable({
    providedIn: 'root',
})
export class ProcessService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly childProcess: AppOutletChildProcess;
    private readonly processQueue = new ProcessQueue();

    constructor(windowRef: WindowRef) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // tslint:disable-next-line:no-string-literal
        this.childProcess = windowRef.nativeWindow['require']('child_process');

        this.processQueue.setProcessQueueListener((process) =>
            this.onNextProcess(process),
        );
    }

    installApplication(application: Application): Promise<void> {
        switch (application.packageType) {
            case PackageType.SNAP:
                this.addProcess(
                    new InstallSnap(this.childProcess, application, (process) =>
                        this.onProcessFinished(process),
                    ),
                );
                break;
            default:
                return Promise.reject('invalid package type');
        }

        return Promise.resolve();
    }

    private addProcess(process: Process): void {
        this.processQueue.push(process);
    }

    private onNextProcess(process: Process): void {
        process.start();
    }

    private onProcessFinished(process: Process): void {
        this.processQueue.notifyProcessFinished(process);
    }

    async getApplicationStatus(
        application: Application,
    ): Promise<ApplicationStatus> {
        if (this.isApplicationInstalling(application)) {
            return Promise.resolve(ApplicationStatus.INSTALLING);
        } else if (await this.isApplicationInstalled(application)) {
            return Promise.resolve(ApplicationStatus.INSTALLED);
        } else {
            return Promise.resolve(ApplicationStatus.NOT_INSTALLED);
        }
    }

    private isApplicationInstalling(application: Application): boolean {
        return this.processQueue
            .getProcessList()
            .some((process) => process.applicationId === application.id);
    }

    private async isApplicationInstalled(
        application: Application,
    ): Promise<boolean> {
        switch (application.packageType) {
            case PackageType.SNAP:
                return this.isSnapInstalled(application);
            default:
                return false;
        }
    }

    private isSnapInstalled(application: Application): Promise<boolean> {
        return this.executeCommand(
            `snap list | grep ${application.packageName}`,
        )
            .then((output: string) => {
                return output.length > 0;
            })
            .catch(() => {
                return false;
            });
    }

    private executeCommand(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.childProcess.exec(command, (error, stdout, stderr) => {
                if (error || stderr) {
                    reject(error || stderr);
                } else {
                    resolve(stdout);
                }
            });
        });
    }
}
