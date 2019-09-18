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

    constructor(
        private activatedRoute: ActivatedRoute,
        private presenter: SearchResultPresenter
    ) { }

    ngOnInit() {
        const searchType = this.activatedRoute.snapshot.params['type']
        this.presenter.init(this, searchType)
    }
}
