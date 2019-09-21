import { Injectable } from '@angular/core'
import { MainRouter } from './main.router'
import { MainComponent } from './main.component'
import { CategoryService } from '../../core/services/category/category.service'
import { Category } from '../../core/model/category.model'
import { SearchType } from '../../core/model/search-type'
import { EventBusService } from 'ngx-eventbus'

@Injectable()
export class MainPresenter {

    private view: MainComponent

    constructor(
        private router: MainRouter,
        private categoryService: CategoryService,
        private eventBusService: EventBusService
    ) { }

    init(view: MainComponent) {
        this.view = view
        this.getAllCategories()
    }

    getAllCategories() {
        this.view.error = false
        this.view.loading = true
        this.categoryService.getAll().subscribe(categories => {
            this.view.categories = categories
        }, error => {
            this.view.error = true
            this.view.loading = false
        }, () => {
            this.view.loading = false
        })
    }

    categoryClicked(category: Category) {
        this.categoryService.setSelectedCategory(category)
        this.eventBusService.triggerEvent('categorySelected', category)
        this.router.goToSearchResult(SearchType.CATEGORY)
    }

    search(query){
        this.eventBusService.triggerEvent('queryTyped', query)
        this.router.goToSearchResult(SearchType.NAME, query)
    }
}
