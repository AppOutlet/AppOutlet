import { Component, OnInit, Input } from '@angular/core'
import { App } from '../../../core/model/app.model'
import { AlertController } from '@ionic/angular'
import { ElectronService } from '../../../core/services'
import { AppService } from '../../../core/services/app/app.service'

@Component({
    selector: 'app-card',
    templateUrl: './app-card.component.html',
    styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent {

    @Input() app: App

    constructor(
        private alertController: AlertController,
        private electronService: ElectronService,
        private appService: AppService
    ) { }

    cardClicked() {
        if (this.app.storeUrl || this.app.homepage) {
            this.electronService.shell.openExternal(this.app.storeUrl || this.app.homepage)
            this.appService.notifyAppClicked(this.app)
        } else {
            this.presentNOUrlAlert()
        }
    }

    async presentNOUrlAlert() {

        const alert = await this.alertController.create({
            header: 'Houston, we have a problem',
            message: `Seems that ${this.app.name} hasn't a url on store`,
            buttons: [{
                text: 'Okay'
            }]
        })

        await alert.present()
    }
}
