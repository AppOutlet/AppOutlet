import { Component, OnInit, Input } from '@angular/core';
import { App } from '../../../core/model/app.model';

@Component({
    selector: 'app-card',
    templateUrl: './app-card.component.html',
    styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {

    @Input() app: App

    constructor() { }

    ngOnInit() {
    }

}
