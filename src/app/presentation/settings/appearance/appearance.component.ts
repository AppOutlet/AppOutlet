import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss']
})
export class AppearanceComponent implements OnInit {

    mode: string
    theme: string
    changed = false

    constructor() { }

    ngOnInit() {
        this.mode = window.localStorage.getItem('mode') || 'ios'
        this.theme = window.localStorage.getItem('theme') || 'light'
    }

    changeUIMode(event: CustomEvent) {
        this.changed = true
        window.localStorage.setItem('mode', event.detail.value)
    }

    changeTheme(event) {
        let theme = event.detail.value
        if(theme == 'dark') {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
        window.localStorage.setItem('theme', theme)
    }

    reload(){
        window.location.reload()
    }
}
