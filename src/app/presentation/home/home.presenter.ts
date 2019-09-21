import { Injectable } from '@angular/core'
import { HomeComponent } from './home.component'
import { AppService } from '../../core/services/app/app.service'
import { TranslateService } from '@ngx-translate/core'
import { App } from '../../core/model/app.model'

@Injectable()
export class HomePresenter {

    private view: HomeComponent

    constructor(
        private appService: AppService,
        private translateService: TranslateService
    ) { }

    init(view: HomeComponent) {
        this.view = view
        this.loadAllData()
    }

    private loadAllData() {
        this.findPopular()
    }

    private findRecentlyUpdated() { }
    private findNew() { }

    private findPopular() {
        this.appService.findPopular().subscribe(apps => {
            this.createPopularSection(apps)
        }, error => {

        })
    }

    private createPopularSection(apps: App[]) {

    }
}
