import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AppDetailPresenter } from './app-detail.presenter';
import { App } from '../../core/model/app.model';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
    statusText = ''
    shouldShowLoading = false

    constructor(
        private presenter: AppDetailPresenter,
        public changesDetector: ChangeDetectorRef,
        private alertController: AlertController,
        private translateService: TranslateService
    ) { }

    ionViewWillEnter() {
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

    ionViewDidLeave() {
        this.app = null
        this.presenter.onDestroy()
    }

    run() {
        this.presenter.run(this.app)
    }

    uninstall() {
        this.presenter.uninstall(this.app)
    }

    async showSupportError(type: String) {

        let title: string = await this.translateService.get('GENERAL.ERROR_MESSAGE').toPromise()
        let message: string = await this.translateService.get('PAGES.APP_DETAIL.NO_SUPPORT_ERROR_MESSAGE', { type }).toPromise()
        let dismiss: string = await this.translateService.get('GENERAL.DISMISS').toPromise()
        let howToSetup: string = await this.translateService.get('PAGES.APP_DETAIL.HOW_TO_SETUP').toPromise()

        const alert = await this.alertController.create({
            header: title,
            message: message,
            buttons: [{
                text: dismiss,
                role: 'cancel'
            }, {
                text: howToSetup,
                handler: () => {
                    this.presenter.goToSupportSetup()
                }
            }]
        });

        await alert.present();
    }

}
