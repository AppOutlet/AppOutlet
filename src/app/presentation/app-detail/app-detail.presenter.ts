import { Injectable } from '@angular/core';
import { AppDetailComponent } from './app-detail.component';
import { AppService } from '../../core/services/app/app.service';

@Injectable()
export class AppDetailPresenter {

    private view: AppDetailComponent

    constructor(
        private appService: AppService
    ) { }

    onInit(view: AppDetailComponent) {
        this.view = view
        this.view.app = this.appService.getSelectedApp()
    }
}
