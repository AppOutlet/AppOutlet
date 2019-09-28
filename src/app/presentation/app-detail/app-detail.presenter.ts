import { Injectable } from '@angular/core';
import { AppDetailComponent } from './app-detail.component';
import { AppService } from '../../core/services/app/app.service';
import { ElectronService } from '../../core/services';

@Injectable()
export class AppDetailPresenter {


    private view: AppDetailComponent

    constructor(
        private appService: AppService,
        private electronService: ElectronService
    ) { }

    onInit(view: AppDetailComponent) {
        this.view = view
        this.view.setApp(this.appService.getSelectedApp())
    }

    goToLink(url: string) {
        this.electronService.shell.openExternal(url)
    }
}
