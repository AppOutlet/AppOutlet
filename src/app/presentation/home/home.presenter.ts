import { Injectable } from '@angular/core'
import { HomeComponent } from './home.component'
import { AppService } from '../../core/services/app/app.service'
import { TranslateService } from '@ngx-translate/core'
import { App } from '../../core/model/app.model'
import { SectionState } from '../../core/model/section.model'

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
        if(this.view.popularSection.apps.length == 0){
            this.findPopular()
        }

        if(this.view.recentlyUpdatedSection.apps.length == 0){
            this.findRecentlyUpdated()
        }

        if(this.view.newSection.apps.length == 0){
            this.findNew()
        }
    }

    private findRecentlyUpdated() {
        this.view.recentlyUpdatedSection.state = SectionState.LOADING
        this.appService.findRecentlyUpdated().subscribe(apps => {
            this.view.recentlyUpdatedSection.apps = apps
            this.view.recentlyUpdatedSection.state = SectionState.LOADED
        }, error => {
            this.view.recentlyUpdatedSection.state = SectionState.ERROR
        })
    }
    private findNew() {
        this.view.newSection.state = SectionState.LOADING
        this.appService.findNew().subscribe(apps => {
            this.view.newSection.apps = apps
            this.view.newSection.state = SectionState.LOADED
        }, error => {
            this.view.newSection.state = SectionState.ERROR
        })
    }

    private findPopular() {
        this.view.popularSection.state = SectionState.LOADING
        this.appService.findPopular().subscribe(apps => {
            this.view.popularSection.apps = apps
            this.view.popularSection.state = SectionState.LOADED
        }, error => {
            this.view.popularSection.state = SectionState.ERROR
        })
    }
}
