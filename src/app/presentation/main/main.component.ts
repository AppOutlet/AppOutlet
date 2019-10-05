import { Component, OnInit } from '@angular/core'
import { MainPresenter } from './main.presenter'
import { Observable } from 'rxjs'
import { Category } from '../../core/model/category.model'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    categories: Category[]
    loading = false
    error = false
    viewMode = 'main'

    constructor(
        private presenter: MainPresenter
    ) { }

    ngOnInit() {
        this.presenter.init(this)
    }

    categoryClicked(category: Category) {
        this.presenter.categoryClicked(category)
    }

    search(query) {
        this.presenter.search(query)
    }

    reloadCategories() {
        this.presenter.getAllCategories()
    }

    goToTags() {
        this.viewMode = 'tags'
    }

    goToMainMenu() {
        this.viewMode = 'main'
    }
}
