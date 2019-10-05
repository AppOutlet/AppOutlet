import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { Config } from '@ionic/angular';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent implements OnInit {

    theme: string

    constructor() { }

    ngOnInit() {
        this.theme = window.localStorage.getItem('theme') || 'light'
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

}
