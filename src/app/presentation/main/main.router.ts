import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { SearchType } from '../../core/model/search-type'

@Injectable()
export class MainRouter {

    constructor(
        private router: Router
    ) { }

    goToSearchResult(searchType: SearchType, query: String = null) {
        if (query) {
            this.router.navigate([`search/${searchType}`], { queryParams: { query: query } })
        } else {
            this.router.navigate([`search/${searchType}`])
        }
    }
}
