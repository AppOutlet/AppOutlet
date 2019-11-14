import { Component, OnInit } from '@angular/core';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent implements OnInit {

    theme: string
    uiMode: string

    constructor(
        private toastController: ToastController,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        this.theme = window.localStorage.getItem('theme') || 'light'
        this.uiMode = window.localStorage.getItem('uiMode') || 'ios'
    }

    changeTheme(event) {
        let theme = event.detail.value
        if (theme == 'dark') {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
        window.localStorage.setItem('theme', theme)
    }

    changeUiMode(event) {
        let uiMode = event.detail.value
        window.localStorage.setItem('uiMode', uiMode)
        this.showRestartToast()
    }

    async showRestartToast() {
        const toast = await this.toastController.create({
            header: await this.translateService.get('PAGES.SETTINGS.APPEARANCE.UI_MODE_CHANGED_MESSAGE_TITLE').toPromise(),
            message: await this.translateService.get('PAGES.SETTINGS.APPEARANCE.UI_MODE_CHANGED_MESSAGE_BODY').toPromise(),
            buttons: [{
                text: 'OK',
                role: 'cancel'
            }]
        });
        toast.present();
    }
}
