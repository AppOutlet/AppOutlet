import { Injectable } from '@angular/core'
import { SearchType } from '../../core/model/search-type'
import { SearchResultComponent } from './search-result.component'
import { AppService } from '../../core/services/app/app.service'
import { CategoryService } from '../../core/services/category/category.service'

@Injectable()
export class SearchResultPresenter {

    private view: SearchResultComponent
    private searchType: SearchType

    constructor(
        private appService: AppService,
        private categoryService: CategoryService
    ) { }

    init(view: SearchResultComponent, searchType: SearchType) {
        this.view = view
        this.searchType = searchType
        this.findApps()
    }

    findApps() {
        switch (this.searchType) {
            case SearchType.CATEGORY:
                this.findByCategory()
                break

            case SearchType.NAME:
                this.findByName()
                break
        }
    }

    private findByCategory() {
        const selectedCategory = this.categoryService.getSelectedCategory()
        this.appService.findByCategory(selectedCategory).subscribe(apps => {
            this.view.apps = apps
            this.view.allApps = apps
        }, err => {
            console.log(err)
        }, () => {

        })
    }

    private findByName() {

    }
}
