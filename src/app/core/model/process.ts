import { App } from "./app.model";
import { ElectronService } from "../services";

export interface Proccess {
    app: App
    processType: ProcessType
    onProcessFinishedCallback: Function
    onProcessUpdatedCallback: Function
    electronService: ElectronService
    start()
}

export enum ProcessType {
    INSTALL,
    REMOVE
}
