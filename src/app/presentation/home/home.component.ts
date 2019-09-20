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
        apps: [

            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
            {
                name: 'Some App',
                type: 'Flatpak',
                icon: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
                shortDescription: 'Some short desctiption here'
            },
        ]
    }

    constructor() { }

    ngOnInit() {
    }

}
