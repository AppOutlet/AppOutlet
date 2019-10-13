import { App } from "./app.model";
import { ElectronService } from "../services";

export interface Process {
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
