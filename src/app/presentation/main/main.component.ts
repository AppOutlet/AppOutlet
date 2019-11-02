import { Component, OnInit } from '@angular/core'
import { MainPresenter } from './main.presenter'
import { Observable } from 'rxjs'
import { Tag } from '../../core/model/tag.model'
import { Category } from '../../core/model/category.model'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    tags: Tag[]
    loading = false
    error = false
    viewMode = 'main'
    categoryList: Category[] = []

    constructor(
        private presenter: MainPresenter
    ) { }

    ngOnInit() {
        this.presenter.init(this)
    }

    tagClicked(tag: Tag) {
        this.presenter.tagClicked(tag)
    }

    onCategoryClicked(category: Category) {
        this.presenter.categoryClicked(category)
    }

    search(query) {
        this.presenter.search(query)
    }

    reloadCategories() {
        this.presenter.getAllTags()
    }

    goToTags() {
        this.viewMode = 'tags'
    }

    goToMainMenu() {
        this.viewMode = 'main'
    }
}
