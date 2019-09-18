import { Component, OnInit } from '@angular/core'
import { App } from '../../core/model/app.model'
import { ActivatedRoute } from '@angular/router'
import { SearchResultPresenter } from './search-result.presenter'

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    type = 'alltypes'
    title = ''
    apps: App[] = []
    allApps: App[] = []

    constructor(
        private activatedRoute: ActivatedRoute,
        private presenter: SearchResultPresenter
    ) { }

    ngOnInit() {
        const searchType = this.activatedRoute.snapshot.params['type']
        this.presenter.init(this, searchType)
    }

    segmentChanged(event) {
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
    }
}
