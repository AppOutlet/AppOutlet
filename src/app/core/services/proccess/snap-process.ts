import { Process, ProcessType } from '../../model/process'
import { App } from '../../model/app.model';
import { ElectronService } from '../electron/electron.service';
import { ChildProcessWithoutNullStreams } from 'child_process';

export class SnapProcess implements Process {

    app: App;
    processType: ProcessType;
    onProcessFinishedCallback: Function;
    onProcessUpdatedCallback: Function;
    electronService: ElectronService;
    stdout: string[] = []
    stderr: string[] = []
    spawn: ChildProcessWithoutNullStreams

    constructor(
        onProcessFinishedCallback: Function,
        onProcessUpdatedCallback: Function,
        app: App,
        processType: ProcessType,
        electronService: ElectronService
    ) {
        this.onProcessFinishedCallback = onProcessFinishedCallback
        this.onProcessUpdatedCallback = onProcessUpdatedCallback
        this.app = app
        this.processType = processType
        this.electronService = electronService
    }

    start() {
        if (this.processType == ProcessType.INSTALL) {
            this.install()
        } else {
            this.uninstall()
        }
    }

    private async install() {

        // this.spawn = this.electronService.childProcess.spawn('flatpak', ['install', 'flathub', this.app.flatpakAppId, '-y'])

        // this.spawn.stdout.on('data', (data) => {
        //     const output = data.toString()
        //     this.processOutput(output)
        //     this.stdout.push(output)
        // });

        // this.spawn.on('error', (data) => {
        // });

        // this.spawn.stderr.on('data', (data) => {
        //     console.error(`ps stderr: ${data.toString()}`);
        //     this.stderr.push(data.toString())
        // });

        // this.spawn.on('close', (code) => {
        //     if (code !== 0) {
        //         console.log(`ps process exited with code ${code}`);
        //     }
        //     this.onProcessFinishedCallback(this.app, code == 0, code)
        // });
    }

    private getInstallCommandArray(app: App) {
        return Promise.resolve(['install'])
            .then(command => this.addChannel(command, app))
            .then(command => this.addConfinement(command, app))
            .then(command => this.addPackageName(command, app))
    }

    private addPackageName(command: string[], app: App) {
        command.push(app.packageName)
        return command
    }

    private addChannel(command: string[], app: App): string[] {
        command.push(`--${app.channel}`)
        return command
    }

    private addConfinement(command: string[], app: App): string[] {

        switch (app.confinement) {
            case 'devmode':
                command.push('--devmode')
                break
            case 'classic':
                command.push('--classic')
                break
        }

        return command
    }

    private uninstall() { }

    private processOutput(output: string) {
        console.log(output)
    }

    private processOutputError(output: any) {
        console.error(output)
    }
}
