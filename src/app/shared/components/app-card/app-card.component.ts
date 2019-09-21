import { Component, OnInit, Input } from '@angular/core';
import { App } from '../../../core/model/app.model';
import { AlertController } from '@ionic/angular';
import * as electron from 'electron'

@Component({
    selector: 'app-card',
    templateUrl: './app-card.component.html',
    styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent {

    @Input() app: App

    constructor(
        private alertController: AlertController
    ) { }

    cardClicked() {
        if (this.app.storeUrl || this.app.homepage) {
            electron.shell.openExternal(this.app.storeUrl)
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
        });

        await alert.present();
    }
}
