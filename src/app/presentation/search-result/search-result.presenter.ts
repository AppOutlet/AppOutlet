import { Injectable } from '@angular/core'
import { SearchType } from '../../core/model/search-type'
import { SearchResultComponent } from './search-result.component'
import { AppService } from '../../core/services/app/app.service'
import { TagService } from '../../core/services/tag/tag.service'
import { EventBusService } from 'ngx-eventbus'
import { Tag } from '../../core/model/tag.model'
import { TranslateService } from '@ngx-translate/core'
import { SectionState } from '../../core/model/section.model'

@Injectable()
export class SearchResultPresenter {

    private view: SearchResultComponent
    private searchType: SearchType
    private selectedTag: Tag
    private categoryEvent: any
    private queryEvent: any
    private currentQuery: string

    constructor(
        private appService: AppService,
        private tagService: TagService,
        private eventBusService: EventBusService,
        private translateService: TranslateService
    ) { }

    init(view: SearchResultComponent, searchType: SearchType, query: string) {

        this.view = view
        this.searchType = searchType
        this.selectedTag = this.tagService.getSelectedTag()
        this.currentQuery = query

        this.findApps(query)

        this.categoryEvent = this.eventBusService.addEventListener({
            name: 'tagSelected',
            callback: (tag: Tag) => {
                this.findByTag(tag)
            }
        })

        this.queryEvent = this.eventBusService.addEventListener({
            name: 'queryTyped',
            callback: (queryTyped: string) => {
                this.findByName(queryTyped)
            }
        })
    }

    findApps(query: string = this.currentQuery) {
        switch (this.searchType) {

            case SearchType.TAG:
                this.findByTag(this.selectedTag)
                break

            case SearchType.CATEGORY:
                this.findByTag(this.selectedTag)
                break

            case SearchType.NAME:
                this.findByName(query)
                break
        }
    }

    private findByTag(tag) {
        this.view.state = SectionState.LOADING
        this.appService.findByTag(tag).subscribe(apps => {
            this.view.apps = apps
            this.view.allApps = apps
            this.view.type = 'alltypes'
            this.view.title = tag.name
            this.view.state = SectionState.LOADED
        }, err => {
            console.log(err)
            this.view.state = SectionState.ERROR
        }, () => {
            this.view.state = SectionState.LOADED
        })
    }

    private findByName(query: string) {
        this.view.state = SectionState.LOADING
        this.appService.findByName(query).subscribe(apps => {
            this.view.apps = apps
            this.view.allApps = apps
            this.view.type = 'alltypes'
            this.updateTitleByQuery(query)
            this.view.state = SectionState.LOADED
        }, err => {
            console.log(err)
            this.view.state = SectionState.ERROR
        }, () => {
            this.view.state = SectionState.LOADED
        })
    }

    private updateTitleByQuery(query: string) {
        this.translateService.get('PAGES.SEARCH.QUERY_TITLE', { query: query }).subscribe(title => {
            this.view.title = title
        })
    }

    destroy() {
        this.eventBusService.removeEventListener(this.categoryEvent)
        this.eventBusService.removeEventListener(this.queryEvent)
    }
}
