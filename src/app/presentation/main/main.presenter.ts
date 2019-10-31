import { Injectable } from '@angular/core'
import { MainRouter } from './main.router'
import { MainComponent } from './main.component'
import { TagService } from '../../core/services/category/category.service'
import { Tag } from '../../core/model/tag.model'
import { SearchType } from '../../core/model/search-type'
import { EventBusService } from 'ngx-eventbus'

@Injectable()
export class MainPresenter {

    private view: MainComponent

    constructor(
        private router: MainRouter,
        private tagService: TagService,
        private eventBusService: EventBusService
    ) { }

    init(view: MainComponent) {
        this.view = view
        this.getAllCategories()
    }

    getAllCategories() {
        this.view.error = false
        this.view.loading = true
        this.tagService.getAll().subscribe(categories => {
            this.view.tags = categories
        }, error => {
            this.view.error = true
            this.view.loading = false
        }, () => {
            this.view.loading = false
        })
    }

    tagClicked(tag: Tag) {
        this.tagService.setSelectedTag(tag)
        this.eventBusService.triggerEvent('tagSelected', tag)
        this.router.goToSearchResult(SearchType.TAG)
    }

    search(query: string) {
        if (this.isQueryValid(query)) {
            this.eventBusService.triggerEvent('queryTyped', query)
            this.router.goToSearchResult(SearchType.NAME, query)
        }
    }

    private isQueryValid(query: string): boolean {
        return query != null && query.length > 2
    }
}
