import { Proccess, ProcessType } from "./process";
import { App } from "./app.model";
import { ElectronService } from "../services";
import { on } from "cluster";
import { from } from "rxjs";
import { flatMap } from 'rxjs/operators'

export class FlatpakProcess implements Proccess {

    onProcessFinishedCallback: Function
    app: App
    processType: ProcessType
    electronService: ElectronService

    constructor(
        onProcessFinishedCallback: Function,
        app: App,
        processType: ProcessType,
        electronService: ElectronService,
    ) {
        this.onProcessFinishedCallback = onProcessFinishedCallback
        this.app = app
        this.processType = processType
        this.electronService = electronService
    }

    startInstall() {
        from(this.verifyFlatpakSupport()).pipe(
            flatMap(this.installPackage.bind(this))
        ).subscribe(data => {
            console.log(data)
        }, err => {
            console.error(err)
        })
    }

    private installPackage() {
        return this.electronService.execCommand(`flatpak install flathub ${this.app.flatpakAppId} -y`)
    }

    verifyFlatpakSupport() {
        return this.electronService.execCommand('flatpak --help')
    }

    startRemove() {
        throw new Error("Method not implemented.");
    }
}
