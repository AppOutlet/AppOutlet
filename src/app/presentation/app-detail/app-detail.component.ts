import { Component, OnInit } from '@angular/core';
import { AppDetailPresenter } from './app-detail.presenter';
import { App } from '../../core/model/app.model';

@Component({
    selector: 'app-app-detail',
    templateUrl: './app-detail.component.html',
    styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent {

    app: App;

    slideOpts = {
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    };

    constructor(
        private presenter: AppDetailPresenter
    ) { }

    ionViewDidEnter() {
        this.presenter.onInit(this)
    }
}
