import { Process, ProcessType } from "./process";
import { App } from "./app.model";
import { ElectronService } from "../services";
import { ChildProcessWithoutNullStreams } from "child_process";
import { from } from "rxjs";
import { filter, throwIfEmpty, map } from "rxjs/operators";

export class FlatpakProcess implements Process {

    onProcessFinishedCallback: Function
    onProcessUpdatedCallback: Function
    app: App
    processType: ProcessType
    electronService: ElectronService
    stdout: string[] = []
    stderr: string[] = []
    spawn: ChildProcessWithoutNullStreams

    constructor(
        onProcessFinishedCallback: Function,
        onProcessUpdatedCallback: Function,
        app: App,
        processType: ProcessType,
        electronService: ElectronService,
    ) {
        this.onProcessFinishedCallback = onProcessFinishedCallback
        this.onProcessUpdatedCallback = onProcessUpdatedCallback
        this.app = app
        this.processType = processType
        this.electronService = electronService
    }

    startInstall() {
        this.spawn = this.electronService.childProcess.spawn('flatpak', ['install', 'flathub', this.app.flatpakAppId, '-y'])

        this.spawn.stdout.on('data', (data) => {
            const output = data.toString()
            this.processOutput(output)
            this.stdout.push(output)
        });

        this.spawn.on('error', (data) => {
        });

        this.spawn.stderr.on('data', (data) => {
            console.error(`ps stderr: ${data.toString()}`);
            this.stderr.push(data.toString())
        });

        this.spawn.on('close', (code) => {
            if (code !== 0) {
                console.log(`ps process exited with code ${code}`);
            }
            this.onProcessFinishedCallback(this.app, code == 0, code)
        });
    }

    startRemove() {
        this.spawn = this.electronService.childProcess.spawn('flatpak', ['uninstall', this.app.flatpakAppId, '-y'])

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

    processOutput(output: string) {
        if (output.includes('Downloading')) {
            from(output.split(" ")).pipe(
                filter(w => w.includes('/')),
                throwIfEmpty(() => new Error()),
                map(w => {
                    let values = w.split('/')
                    return {
                        partial: new Number(values[0]).valueOf(),
                        total: new Number(values[1]).valueOf()
                    }
                }),
                map(values => {
                    let percent = values.partial * 100 / values.total
                    if (isNaN(percent)) {
                        throw new Error()
                    }
                    return `${percent.toFixed(1)}%`
                })
            ).subscribe(text => {
                this.onProcessUpdatedCallback(this.app, text)
            }, err => {
            })
        }
    }
}
