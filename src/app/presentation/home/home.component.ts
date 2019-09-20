import { Component, OnInit } from '@angular/core'
import { Section } from '../../core/model/section.model'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    section: Section = {
        title: 'Custom Section',
        apps: [{
            name: 'Some App',
            type: 'Flatpak',
        }]
    }

    constructor() { }

    ngOnInit() {
    }

}
