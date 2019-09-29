import { Injectable } from '@angular/core';
import { AppDetailComponent } from './app-detail.component';
import { AppService } from '../../core/services/app/app.service';
import { ElectronService } from '../../core/services';
import { App } from '../../core/model/app.model';
import { AppState } from '../../core/model/app-state.model';
import { ProcessService } from '../../core/services/proccess/process.service';

@Injectable()
export class AppDetailPresenter {

    private view: AppDetailComponent
    private state: AppState = AppState.UNKNOWN

    constructor(
        private appService: AppService,
        private electronService: ElectronService,
        private processService: ProcessService
    ) { }

    onInit(view: AppDetailComponent) {
        this.view = view
        this.view.setApp(this.appService.getSelectedApp())
        this.getAppState(this.view.app)
    }

    goToLink(url: string) {
        this.electronService.shell.openExternal(url)
    }

    installButtonClicked(app: App) {
        this.appService.install(app)
    }

    getAppState(app:App){
        this.appService.getAppState(app).then((state: AppState)=>{
            this.state = state
            this.view.shouldShowInstallButton = state == AppState.NOT_INSTALLED
            this.view.shouldShowRunButton = state == AppState.INSTALLED
            this.view.shouldShowUninstallButton = state == AppState.INSTALLED
        })
    }
}
