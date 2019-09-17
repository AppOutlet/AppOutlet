import { Component, OnInit } from '@angular/core'
import { MainPresenter } from './main.presenter'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    categories: Category[]
    loading = false

    constructor(
        private presenter: MainPresenter
    ) { }

    ngOnInit() {
        this.presenter.init(this)
    }

}
