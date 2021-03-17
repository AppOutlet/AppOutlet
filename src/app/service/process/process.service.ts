import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import * as PackageType from '../../../../core/model/PackageType';
import { WindowRef } from '../../util/window-ref';
import { ChildProcess } from 'child_process';
import { Process } from './process';
import { InstallSnap } from './install-snap.process';
import { ProcessQueue } from './ProcessQueue';

@Injectable({
    providedIn: 'root',
})
export class ProcessService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly childProcess: ChildProcess;
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
                    new InstallSnap(this.childProcess, application),
                );
                break;
            default:
                return Promise.reject('invalid package tyoe');
        }

        return Promise.resolve();
    }

    private addProcess(process: Process): void {
        this.processQueue.push(process);
    }

    private onNextProcess(process: Process): void {
        process.start();
    }
}
