import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppDetailPresenter } from './app-detail.presenter';
import { App } from '../../core/model/app.model';

@Component({
    selector: 'app-app-detail',
    templateUrl: './app-detail.component.html',
    styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent {

    @ViewChild('fullDescriptionContainer', { static: false })
    fullDescriptionContainer: ElementRef;
    app: App;
    loading = true
    shouldShowInstallButton = false
    shouldShowRunButton = false
    shouldShowUninstallButton = false

    constructor(
        private presenter: AppDetailPresenter
    ) {}

    ionViewWillEnter(){
        this.loading = true
    }

    ionViewDidEnter() {
        this.presenter.onInit(this)
    }

    setApp(app: App) {
        this.app = app
        this.fullDescriptionContainer.nativeElement.innerHTML = app.fullDescription
        this.loading = false
    }

    goToLink(url: string) {
        this.presenter.goToLink(url)
    }

    install() {
        this.presenter.installButtonClicked(this.app)
    }

    ionViewDidLeave(){
        this.app = null
    }
}
