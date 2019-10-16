import { Process, ProcessType } from '../../model/process'
import { App } from '../../model/app.model';
import { ElectronService } from '../electron/electron.service';
import { ChildProcessWithoutNullStreams } from "child_process";
import { GithubRepository } from '../../repository/github/github.repository'

export class AppImageProcess implements Process {

    app: App;
    processType: ProcessType;
    onProcessFinishedCallback: Function;
    onProcessUpdatedCallback: Function;
    electronService: ElectronService;
    stdout: string[] = []
    stderr: string[] = []
    spawn: ChildProcessWithoutNullStreams
    githubRepository: GithubRepository

    constructor(
        onProcessFinishedCallback: Function,
        onProcessUpdatedCallback: Function,
        app: App,
        processType: ProcessType,
        electronService: ElectronService,
        githubRepository: GithubRepository,
    ) {
        this.onProcessFinishedCallback = onProcessFinishedCallback
        this.onProcessUpdatedCallback = onProcessUpdatedCallback
        this.app = app
        this.processType = processType
        this.electronService = electronService
        this.githubRepository = githubRepository
    }

    start() {
        if (this.processType == ProcessType.INSTALL) {
            this.install()
        } else {
            this.uninstall()
        }
    }

    private async install() {
        this.getDownloadUrl(this.app.downloadLink)
            .subscribe(url => {
                this.executeInstall(url)
            }, err => {
                this.executeInstallError
            })
    }

    executeInstallError() {
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

    executeInstall(url: string) {
        this.spawn = this.electronService.childProcess.spawn('echo', [this.app.downloadLink])

        this.spawn.stdout.on('data', (data) => {
            const output = data.toString()
            this.processOutput(output)
            this.stdout.push(output)
        });
    }

    getDownloadUrl(url: string) {
        return this.githubRepository.getLatestRelease(url)
    }

    private uninstall() {

        let snap = this.electronService.childProcess.spawn('pkexec', ['snap', 'remove', this.app.packageName])

        snap.stdout.on('data', (data) => {
            const output = data.toString()
            this.processOutput(output)
            this.stdout.push(output)
        });

        snap.on('error', (data) => {
            console.error(`ps stderr: ${data.toString()}`);
            this.stderr.push(data.toString())
        });

        snap.stderr.on('data', (data) => {
            console.error(`ps stderr: ${data.toString()}`);
            this.stderr.push(data.toString())
        });

        snap.on('close', (code) => {
            if (code !== 0) {
                console.log(`ps process exited with code ${code}`);
            }
            this.onProcessFinishedCallback(this.app, code == 0, code)
        });
    }

    private processOutput(output: string) {
        console.log(output)
    }

    private processOutputError(output: any) {
        console.error(output)
    }
}
