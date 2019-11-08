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
        this.getDownloadUrl(this.app.downloadLink).subscribe(item => {
            this.executeInstall(item.browser_download_url, this.app._id)
        }, err => {
            console.log('Error to get appimage')
        })
    }

    executeInstall(url: string, id: string) {
        this.electronService.execCommand('mkdir -p $HOME/.appoutlet')
            .then(() => this.getFile(url, id))
            .then(() => this.setPermissionFile(id))
            .then(() =>{
                this.onProcessFinishedCallback(this.app, true, 0)
            })
    }

    setPermissionFile(id: string) {
        this.electronService.execCommand(`chmod +x $HOME/.appoutlet/${id}.AppImage`)
    }

    getFile(url: string, id: string): any {
        return this.electronService.execCommand(`wget ${url} -O $HOME/.appoutlet/${id}.AppImage`)
    }

    getDownloadUrl(url: string) {
        return this.githubRepository.getLatestRelease(url)
    }

    private uninstall() {
        this.electronService.execCommand(`rm $HOME/.appoutlet/${this.app._id}.AppImage`).then()
        this.onProcessFinishedCallback(this.app, true, 0)
    }

}
