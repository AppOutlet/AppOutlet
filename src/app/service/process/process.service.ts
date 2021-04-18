import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import * as PackageType from '../../../../core/model/PackageType';
import { WindowRef } from '../../util/window-ref';
import { Process } from './process';
import { InstallSnap } from './snap/install-snap.process';
import { ProcessQueue } from './process-queue';
import { ApplicationStatus } from '../../model/application-status';
import { AppOutletChildProcess } from '../../util/app-outlet-child-process';
import { ProcessListeners } from './process-listeners';
import { Observable, Subject } from 'rxjs';
import { ProcessInfo } from './process-info';
import { UninstallSnap } from './snap/uninstall-snap.process';
import { InstallFlatpak } from './flatpak/install-flatpak.process';
import { UninstallFlatpak } from './flatpak/uninstall-flatpak.process.';
import { CoreService } from '../core/core.service';

@Injectable({
    providedIn: 'root',
})
export class ProcessService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly childProcess: AppOutletChildProcess;
    private processListeners: ProcessListeners = {};

    constructor(
        windowRef: WindowRef,
        private processQueue: ProcessQueue,
        private codeService: CoreService,
    ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // tslint:disable-next-line:no-string-literal
        this.childProcess = windowRef.nativeWindow['require']('child_process');
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
            case PackageType.FLATPAK:
                this.addProcess(
                    new InstallFlatpak(
                        this.childProcess,
                        application,
                        (process) => {
                            this.onProcessFinished(process);
                        },
                        (processInfo) => this.onUpdateProcess(processInfo),
                    ),
                );
                break;
            case PackageType.APP_IMAGE:
                return this.codeService.openLinkOnBrowser(
                    application.downloadUrl ?? '',
                );
            default:
                return Promise.reject('invalid package type');
        }

        return Promise.resolve();
    }

    getProcessListener(applicationId: string): Observable<ProcessInfo> {
        this.addProcessListenerIfNecessary(applicationId);
        return this.processListeners[applicationId];
    }

    private getProcessListenerSubject(
        applicationId: string,
    ): Subject<ProcessInfo> {
        this.addProcessListenerIfNecessary(applicationId);
        return this.processListeners[applicationId];
    }

    private onUpdateProcess(processInfo: ProcessInfo): void {
        this.getProcessListenerSubject(processInfo.applicationId).next(
            processInfo,
        );
    }

    private addProcess(process: Process): void {
        this.processQueue.push(process);
        this.addProcessListenerIfNecessary(process.getApplicationId());
    }

    private onProcessFinished(process: Process): void {
        this.processQueue.notifyProcessFinished(process);
        if (this.processListeners[process.getApplicationId()]) {
            this.processListeners[process.getApplicationId()].next(
                process.getProcessInfo(),
            );
        }
    }

    private addProcessListenerIfNecessary(applicationId: string): void {
        if (!this.processListeners[applicationId]) {
            this.processListeners[applicationId] = new Subject<ProcessInfo>();
        }
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
            case PackageType.FLATPAK:
                return this.isFlatpakInstalled(application);
            default:
                return false;
        }
    }

    private isFlatpakInstalled(application: Application): Promise<boolean> {
        return this.executeCommand(
            `flatpak list | grep ${application.packageName}`,
        )
            .then((output: string) => {
                return output.length > 0;
            })
            .catch(() => {
                return false;
            });
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

    uninstallApplication(application: Application): Promise<void> {
        switch (application.packageType) {
            case PackageType.SNAP:
                this.addProcess(
                    new UninstallSnap(
                        this.childProcess,
                        application,
                        (process) => this.onProcessFinished(process),
                    ),
                );
                break;
            case PackageType.FLATPAK:
                this.addProcess(
                    new UninstallFlatpak(
                        this.childProcess,
                        application,
                        (process) => this.onProcessFinished(process),
                    ),
                );
                break;
            default:
                return Promise.reject('invalid package type');
        }

        return Promise.resolve();
    }

    getProcessListeners(): ProcessListeners {
        return this.processListeners;
    }
}
