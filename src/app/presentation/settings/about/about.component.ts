import { Component, OnInit } from '@angular/core';
import { version, authors } from './../../../../../package.json';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    appVersion: string
    authors = []

    constructor() {
        this.appVersion = version
        this.authors = authors
    }

    ngOnInit() {
    }
}
