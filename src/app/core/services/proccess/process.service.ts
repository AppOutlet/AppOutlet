import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Proccess, ProcessType } from '../../model/process';
import { App } from '../../model/app.model';
import { FlatpakProcess } from '../../model/flatpak-process';

@Injectable({
    providedIn: "root"
})
export class ProcessService {

    private processQueue: Proccess[] = []
    private processServiceState = ProcessServiceState.IDLE

    constructor(
        private electronService: ElectronService
    ) { }

    install(app: App) {

        if (!this.electronService.isElectron) return

        switch (app.type) {
            case 'Flatpak':
                this.addFlatpakProcessToQueue(app, ProcessType.INSTALL)
                break
            default:
                console.log('Invalid type')
        }

        this.onProcessAddedToQueue()
    }

    private onProcessAddedToQueue() {
        if (this.processQueue.length > 0) {
            this.processQueue[0].startInstall()
        } else {
            console.log('Empty queue')
        }
    }

    addFlatpakProcessToQueue(app: App, processType: ProcessType) {
        const process = new FlatpakProcess(
            this.onProcessFinished,
            app,
            processType,
            this.electronService
        )
        this.processQueue.push(process)
    }

    onProcessFinished() {
        console.log("processFinished")
    }
}

enum ProcessServiceState {
    BUSY,
    IDLE
}
