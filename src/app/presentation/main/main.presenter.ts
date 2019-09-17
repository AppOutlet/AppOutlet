import { Injectable } from '@angular/core'
import { MainRouter } from './main.router'
import { MainComponent } from './main.component'
import { CategoryService } from '../../core/services/category/category.service'
import { Category } from '../../core/model/category.model'

@Injectable()
export class MainPresenter {

    private view: MainComponent

    constructor(
        private router: MainRouter,
        private categoryService: CategoryService
    ) { }

    init(view: MainComponent) {
        this.view = view
        this.getAllCategories()
    }

    getAllCategories() {
        this.view.loading = true
        this.categoryService.getAll().subscribe(categories => {
            this.view.categories = categories
        }, error => {
            console.log(error)
        }, () => {
            this.view.loading = false
        })
    }

    categoryClicked(category: Category){
        this.categoryService.selectCategory(category)
    }
}
