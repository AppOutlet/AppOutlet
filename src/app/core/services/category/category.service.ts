import { Injectable } from '@angular/core'
import { CategoryRepository } from '../../repository/category/category.repository'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    getAll(): Observable<Category[]> {
        return this.categoryRepository.getAll()
    }
}
