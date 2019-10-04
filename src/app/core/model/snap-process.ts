import { Proccess, ProcessType } from "./process";
import { App } from "./app.model";
import { ElectronService } from "../services";
import { ChildProcessWithoutNullStreams } from "child_process";
import { from } from "rxjs";
import { filter, throwIfEmpty, map } from "rxjs/operators";
import { AlertController } from '@ionic/angular'

export class SnapProcess implements Proccess {

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
        private alertController: AlertController,
    ) {
        this.onProcessFinishedCallback = onProcessFinishedCallback
        this.onProcessUpdatedCallback = onProcessUpdatedCallback
        this.app = app
        this.processType = processType
        this.electronService = electronService
    }

    startInstall() {
        this.presentNOUrlAlert(`Instalando o snap ${this.app.packageName}`)// teste 
        this.spawn = this.electronService.childProcess.spawn('snap', ['install', this.app.packageName, '-y'])

        this.spawn.stdout.on('data', (data) => {
            const output = data.toString()
            this.processOutput(output)
            this.stdout.push(output)
        });

        this.spawn.on('error', (data) => {
        });

        this.spawn.stderr.on('data', (data) => {
            this.presentNOUrlAlert(`ps stderr: ${data.toString()}`);
            this.stderr.push(data.toString())
        });

        this.spawn.on('close', (code) => {
            if (code !== 0) {
                this.presentNOUrlAlert(`processo ps encerrado com código ${code}`);
            }
            this.onProcessFinishedCallback(this.app, code == 0, code)
        });
    }

    startRemove() {
        this.spawn = this.electronService.childProcess.spawn('snap', ['remove', this.app.packageName, '-y'])

        this.spawn.stdout.on('data', (data) => {
            const output = data.toString()
            console.log(output)
            this.stdout.push(output)
        });

        this.spawn.stderr.on('data', (data) => {
            this.presentNOUrlAlert(`ps stderr: ${data.toString()}`)
            this.stderr.push(data.toString())
        });

        this.spawn.on('close', (code) => {
            if (code !== 0) {
                this.presentNOUrlAlert(`processo ps encerrado com código ${code}`)
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
                this.presentNOUrlAlert('Tipo de processo inválido')
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
