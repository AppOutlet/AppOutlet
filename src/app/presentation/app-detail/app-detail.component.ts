import { Component, OnInit } from '@angular/core';
import { AppDetailPresenter } from './app-detail.presenter';

@Component({
    selector: 'app-app-detail',
    templateUrl: './app-detail.component.html',
    styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent {

    constructor(
        private presenter: AppDetailPresenter
    ) { }

    ionViewDidEnter() {
        this.presenter.onInit(this)
    }
}
