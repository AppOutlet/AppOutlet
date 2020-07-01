import { Component, OnInit, OnDestroy } from '@angular/core'
import { App } from '../../core/model/app.model'
import { ActivatedRoute } from '@angular/router'
import { SearchResultPresenter } from './search-result.presenter'
import { SectionState } from '../../core/model/section.model'

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

    type = 'alltypes'
    title = ''
    apps: App[] = []
    allApps: App[] = []
    state = ''

    constructor(
        private activatedRoute: ActivatedRoute,
        private presenter: SearchResultPresenter
    ) { }

    ionViewDidLeave() {
        this.presenter.destroy()
    }

    ionViewDidEnter() {
        const searchType = this.activatedRoute.snapshot.params['type']
        const query = this.activatedRoute.snapshot.queryParams.query
        this.presenter.init(this, searchType, query)
    }

    segmentChanged(event) {
        this.state = SectionState.LOADING
        switch (event.detail.value) {
            case 'alltypes':
                this.apps = this.allApps
                break
            case 'snap':
                this.apps = this.allApps.filter(item => item.type === 'Snap')
                break
            case 'flatpak':
                this.apps = this.allApps.filter(item => item.type === 'Flatpak')
                break
            case 'appimage':
                this.apps = this.allApps.filter(item => item.type === 'AppImage')
                break
        }
        this.state = SectionState.LOADED
    }

    doReload() {
        this.presenter.findApps()
    }
}
