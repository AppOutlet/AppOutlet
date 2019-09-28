import { App } from "./app.model";
import { ElectronService } from "../services";

export interface Proccess {
    app: App
    processType: ProcessType
    onProcessFinishedCallback: Function
    electronService: ElectronService
    startInstall()
    startRemove()
}

export enum ProcessType{
    INSTALL,
    REMOVE
}
