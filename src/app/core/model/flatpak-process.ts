import { Proccess, ProcessType } from "./process";
import { App } from "./app.model";
import { ElectronService } from "../services";
import { on } from "cluster";
import { from } from "rxjs";
import { flatMap } from 'rxjs/operators'
import { ChildProcessWithoutNullStreams } from "child_process";

export class FlatpakProcess implements Proccess {

    onProcessFinishedCallback: Function
    app: App
    processType: ProcessType
    electronService: ElectronService
    stdout: string[] = []
    stderr: string[] = []
    spawn: ChildProcessWithoutNullStreams

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
        this.spawn = this.electronService.childProcess.spawn('flatpak', ['install', 'flathub', this.app.flatpakAppId, '-y'])

        this.spawn.stdout.on('data', (data) => {
            const output = data.toString()
            console.log(output)
            this.stdout.push(output)
        });

        this.spawn.stderr.on('data', (data) => {
            console.error(`ps stderr: ${data.toString()}`);
            this.stderr.push(data.toString())
        });

        this.spawn.on('close', (code) => {
            if (code !== 0) {
                console.log(`ps process exited with code ${code}`);
            }
            this.onProcessFinishedCallback(this.app, code == 0)
        });
    }

    startRemove() {
        throw new Error("Method not implemented.");
    }

    start() {
        switch (this.processType) {
            case ProcessType.INSTALL:
                this.startInstall()
                break
            case ProcessType.REMOVE:
                this.startRemove()
                break
            default:
                console.log('Invalid process type')
                this.onProcessFinishedCallback()
        }
    }
}
