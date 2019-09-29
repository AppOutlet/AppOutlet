import { Injectable } from '@angular/core';
import { AppDetailComponent } from './app-detail.component';
import { AppService } from '../../core/services/app/app.service';
import { ElectronService } from '../../core/services';
import { App } from '../../core/model/app.model';
import { AppState } from '../../core/model/app-state.model';
import { EventBusService } from 'ngx-eventbus';

@Injectable()
export class AppDetailPresenter {

    private view: AppDetailComponent
    private state: AppState = AppState.UNKNOWN
    private updateListener

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
            this.view.shouldShowInstallButton = state == AppState.NOT_INSTALLED
            this.view.shouldShowRunButton = state == AppState.INSTALLED
            this.view.shouldShowUninstallButton = state == AppState.INSTALLED
            this.view.shouldShowLoading = state == AppState.INSTALLING || state == AppState.REMOVING
            this.view.changesDetector.detectChanges()
        })
    }

    private registerEventListener(app: App) {
        this.updateListener = this.eventBusService.addEventListener({
            name: app._id,
            callback: () => {
                this.getAppState(app)
            }
        })
    }

    onDestroy() {
        this.unregisterEventListener()
    }

    private unregisterEventListener() {
        this.eventBusService.removeEventListener(this.updateListener)
    }

    uninstall(app: App) {
        this.appService.uninstall(app)
        this.getAppState(app)
    }

    run(app: App) {
        this.appService.run(app)
    }
}
