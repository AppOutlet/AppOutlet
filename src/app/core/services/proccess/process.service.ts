import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Proccess, ProcessType } from '../../model/process';
import { App } from '../../model/app.model';
import { FlatpakProcess } from '../../model/flatpak-process';
import { SnapProcess } from '../../model/snap-process';
import { EventBusService } from 'ngx-eventbus';
import { AlertController } from '@ionic/angular'

@Injectable({
    providedIn: "root"
})
export class ProcessService {

    processQueue: Proccess[] = []
    processQueueErrors: Proccess[] = []
    processServiceState = ProcessServiceState.IDLE

    constructor(
        private electronService: ElectronService,
        private eventBusService: EventBusService,
        private alertController: AlertController
    ) { }

    install(app: App) {
        if (!this.electronService.isElectron) return
        console.log(`App ${app.type}`)// teste 
        switch (app.type) {
            case 'Flatpak':
                this.addFlatpakProcessToQueue(app, ProcessType.INSTALL)
                break
            case 'Snap':
                this.addSnapProcessToQueue(app, ProcessType.INSTALL)
                break
            default:
                this.presentNOUrlAlert(`Este aplicativo não pode ser instalado ${app.type} ainda`)
        }

        if (this.processServiceState == ProcessServiceState.IDLE) {
            this.onQueueModified()
        }
    }

    private onQueueModified() {
        if (this.processQueue.length > 0) {
            this.processServiceState = ProcessServiceState.BUSY
            this.processQueue[0].start()
        } else {
            this.processServiceState = ProcessServiceState.IDLE
            this.presentNOUrlAlert('Fila vazia')
        }
    }

    addFlatpakProcessToQueue(app: App, processType: ProcessType) {
        const process = new FlatpakProcess(
            this.onProcessFinished.bind(this),
            this.onProcessUpdated.bind(this),
            app,
            processType,
            this.electronService
        )
        this.processQueue.push(process)
    }
    addSnapProcessToQueue(app: App, processType: ProcessType) {
        const process = new SnapProcess(
            this.onProcessFinished.bind(this),
            this.onProcessUpdated.bind(this),
            app,
            processType,
            this.electronService,
            null
        )
        this.processQueue.push(process)
    }

    onProcessFinished(app: App, success: boolean, exitCode: number) {
        const finishedProccess = this.processQueue.shift()
        if (!success) {
            this.processQueueErrors.push(finishedProccess)
        }
        this.onQueueModified()
        this.eventBusService.triggerEvent(app._id, { app, success, exitCode })
    }

    onProcessUpdated(app: App, text: String) {
        this.eventBusService.triggerEvent(`info-${app._id}`, text)
    }

    uninstall(app: App) {
        if (!this.electronService.isElectron) return

        switch (app.type) {
            case 'Flatpak':
                this.addFlatpakProcessToQueue(app, ProcessType.REMOVE)
                break
            case 'Snap':
                this.addSnapProcessToQueue(app, ProcessType.REMOVE)
                break
            default:
                this.presentNOUrlAlert(`Este aplicativo não pode ser removido ${app.type} ainda`)
        }

        if (this.processServiceState == ProcessServiceState.IDLE) {
            this.onQueueModified()
        }
    }
    async presentNOUrlAlert(output: string) {

        const alert = await this.alertController.create({
            header: '...',
            message: `${output}`,
            buttons: [{
                text: 'OK'
            }]
        })

        await alert.present()
    }
}

enum ProcessServiceState {
    BUSY,
    IDLE
}
