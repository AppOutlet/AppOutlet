import { Injectable } from '@angular/core'
import { AppDetailComponent } from './app-detail.component'
import { AppService } from '../../core/services/app/app.service'
import { ElectronService } from '../../core/services'
import { App } from '../../core/model/app.model'
import { AppState } from '../../core/model/app-state.model'
import { EventBusService } from 'ngx-eventbus'
import { ExitCode } from '../../core/model/exit-code.enum'

@Injectable()
export class AppDetailPresenter {

    private view: AppDetailComponent
    private state: AppState = AppState.UNKNOWN
    private processEndListener
    private processInfoListener
    private supportedTypes = ['Flatpak', 'Snap', 'AppImage']

    constructor(
        private appService: AppService,
        private electronService: ElectronService,
        private eventBusService: EventBusService
    ) { }

    onInit(view: AppDetailComponent) {
        this.view = view
        this.view.setApp(this.appService.getSelectedApp())
        this.getAppState(this.view.app)
        this.registerEventListener(this.view.app)
        this.appService.notifyAppClicked(view.app)
    }

    goToLink(url: string) {
        this.electronService.shell.openExternal(url)
    }

    installButtonClicked(app: App) {
        this.appService.install(app)
        this.getAppState(app)
    }

    getAppState(app: App) {
        this.appService.getAppState(app).then((state: AppState) => {
            this.state = state
            const isAppSupported = this.supportedTypes.includes(app.type)
            this.view.shouldShowInstallButton = state === AppState.NOT_INSTALLED && isAppSupported
            this.view.shouldShowRunButton = state === AppState.INSTALLED && isAppSupported
            this.view.shouldShowUninstallButton = state === AppState.INSTALLED && isAppSupported
            this.view.shouldShowLoading = state === AppState.INSTALLING || state === AppState.REMOVING && isAppSupported
            this.view.changesDetector.detectChanges()
        })
    }

    private registerEventListener(app: App) {
        this.processEndListener = this.eventBusService.addEventListener({
            name: app._id,
            callback: (processDetails) => {
                this.view.statusText = ''
                this.getAppState(app)
                this.processExitCode(processDetails)
            }
        })

        this.processInfoListener = this.eventBusService.addEventListener({
            name: `info-${app._id}`,
            callback: (info) => {
                this.view.statusText = info
                this.view.changesDetector.detectChanges()
            }
        })
    }

    onDestroy() {
        this.unregisterEventListener()
    }

    private unregisterEventListener() {
        this.eventBusService.removeEventListener(this.processEndListener)
        this.eventBusService.removeEventListener(this.processInfoListener)
    }

    uninstall(app: App) {
        this.appService.uninstall(app)
        this.getAppState(app)
    }

    run(app: App) {
        this.appService.run(app)
    }

    processExitCode(processDetails) {
        if (!processDetails.success) {
            switch (processDetails.exitCode) {
                case ExitCode.SUPPORT_ERROR:
                    this.view.showSupportError(processDetails.app.type)
                    break
            }
        }
    }

    goToSupportSetup() {
        switch (this.view.app.type) {
            case 'Flatpak':
                this.goToLink('https://flatpak.org/setup/')
                break
            case 'Snap':
                this.goToLink('https://snapcraft.io/docs/getting-started')
                break
        }
    }
}
