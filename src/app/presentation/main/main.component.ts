import { Component, OnInit } from '@angular/core'
import { MainPresenter } from './main.presenter'
import { Observable } from 'rxjs'
import { Tag } from '../../core/model/tag.model'

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

    constructor(
        private presenter: MainPresenter
    ) { }

    ngOnInit() {
        this.presenter.init(this)
    }

    tagClicked(tag: Tag) {
        this.presenter.tagClicked(tag)
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
