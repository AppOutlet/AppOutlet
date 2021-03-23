import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import * as PackageType from '../../../../core/model/PackageType';
import { WindowRef } from '../../util/window-ref';
import { Process } from './process';
import { InstallSnap } from './install-snap.process';
import { ProcessQueue } from './ProcessQueue';
import { ApplicationStatus } from '../../model/application-status';

@Injectable({
    providedIn: 'root',
})
export class ProcessService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly childProcess: any;
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getApplicationStatus(application: Application): Promise<ApplicationStatus> {
        return Promise.resolve(ApplicationStatus.INSTALLING);
    }
}
