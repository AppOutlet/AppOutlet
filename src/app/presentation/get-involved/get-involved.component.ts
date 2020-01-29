import { Component, OnInit } from '@angular/core'
import { ElectronService } from '../../core/services'
import { ToastController } from '@ionic/angular'

@Component({
    selector: 'app-get-involved',
    templateUrl: './get-involved.component.html',
    styleUrls: ['./get-involved.component.scss']
})
export class GetInvolvedComponent implements OnInit {

    constructor(
        private electronService: ElectronService,
        private toastController: ToastController
    ) { }

    ngOnInit() {
    }

    openLink(url: string) {
        this.electronService.shell.openExternal(url)
        this.showMessageToast()
    }

    async showMessageToast() {
        const toast = await this.toastController.create({
            header: 'External resource',
            message: 'The page will open in you browser',
            duration: 3000,
            buttons: [{
                text: 'OK',
                role: 'cancel'
            }]
        })
        toast.present()
    }
}
