import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { SearchType } from '../../core/model/search-type'

@Injectable()
export class MainRouter {

    constructor(
        private router: Router
    ) { }

    goToSearchResult(searchType: SearchType) {
        this.router.navigate([`search/${searchType}`])
    }
}
