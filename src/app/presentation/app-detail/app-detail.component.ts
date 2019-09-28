import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppDetailPresenter } from './app-detail.presenter';
import { App } from '../../core/model/app.model';

@Component({
    selector: 'app-app-detail',
    templateUrl: './app-detail.component.html',
    styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent {

    @ViewChild('fullDescriptionContainer', { static: false })
    fullDescriptionContainer: ElementRef;
    app: App;

    constructor(
        private presenter: AppDetailPresenter
    ) { }

    ionViewDidEnter() {
        this.presenter.onInit(this)
    }

    setApp(app: App) {
        this.app = app
        this.fullDescriptionContainer.nativeElement.innerHTML = app.fullDescription
    }
}
