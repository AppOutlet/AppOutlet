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
            .subscribe(item => {
                this.executeInstall(item.browser_download_url)
            }, err => {
                console.log('Error to get appimage')
            })
    }

    executeInstall(url: string) {
        this.electronService.execCommand('mkdir -p $HOME/.appoutlet')
            .then(() => this.getFile(url))
            .finally(() => this.setPermissionFile(url.substring(url.lastIndexOf('/')+1)))
        this.onProcessFinishedCallback(this.app, true, 0)
    }

    setPermissionFile(url: string) {
        this.electronService.execCommand(`chmod +x $HOME/.appoutlet/${url}`)
    }

    getFile(url: string) : any {
        return this.electronService.execCommand(`wget -P $HOME/.appoutlet ${url}`)
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
