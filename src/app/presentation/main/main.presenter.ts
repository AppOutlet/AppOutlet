import { Injectable } from '@angular/core'
import { MainRouter } from './main.router'
import { MainComponent } from './main.component'
import { TagService } from '../../core/services/tag/tag.service'
import { Tag } from '../../core/model/tag.model'
import { SearchType } from '../../core/model/search-type'
import { EventBusService } from 'ngx-eventbus'
import { CategoryService } from '../../core/services/category/category.service'

@Injectable()
export class MainPresenter {

    private view: MainComponent

    constructor(
        private router: MainRouter,
        private tagService: TagService,
        private eventBusService: EventBusService,
        private categoryService: CategoryService
    ) { }

    init(view: MainComponent) {
        this.view = view
        this.getAllTags()
        this.getAllCategories()
    }

    getAllCategories(){
        this.categoryService.getAll().subscribe(categoryList => {
            this.view.categoryList = categoryList
        })
    }

    getAllTags() {
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
