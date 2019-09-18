import { Injectable } from '@angular/core'
import { AppRepository } from '../../repository/app/app.repository'
import { Category } from '../../model/category.model'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private appRepository: AppRepository
    ) { }

    findByCategory(category: Category) {
        return this.appRepository.findByCategory(category)
    }

    findByName(query: string) {
        return this.appRepository.findByName(query)
    }
}
