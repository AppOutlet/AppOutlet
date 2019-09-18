import { Injectable } from '@angular/core'
import { SearchType } from '../../core/model/search-type'
import { SearchResultComponent } from './search-result.component'
import { AppService } from '../../core/services/app/app.service'
import { CategoryService } from '../../core/services/category/category.service'
import { EventBusService } from 'ngx-eventbus'
import { Category } from '../../core/model/category.model'

@Injectable()
export class SearchResultPresenter {

    private view: SearchResultComponent
    private searchType: SearchType
    private selectedCategory: Category

    constructor(
        private appService: AppService,
        private categoryService: CategoryService,
        private eventBusService: EventBusService
    ) { }

    init(view: SearchResultComponent, searchType: SearchType) {
        this.view = view
        this.searchType = searchType
        this.selectedCategory = this.categoryService.getSelectedCategory()

        this.findApps()
        this.eventBusService.addEventListener({
            name: 'categorySelected',
            callback: (category: Category) => {
                this.findByCategory(category)
            }
        })
    }

    findApps() {
        switch (this.searchType) {
            case SearchType.CATEGORY:
                this.findByCategory(this.selectedCategory)
                break

            case SearchType.NAME:
                this.findByName()
                break
        }
    }

    private findByCategory(category) {
        this.appService.findByCategory(category).subscribe(apps => {
            this.view.apps = apps
            this.view.allApps = apps
            this.view.type = 'alltypes'
        }, err => {
            console.log(err)
        }, () => {

        })
    }

    private findByName() {

    }
}
