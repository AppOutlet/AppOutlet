import { Injectable } from '@angular/core'
import { CategoryRepository } from '../../repository/category/category.repository'
import { Observable } from 'rxjs'
import { Category } from '../../model/category.model'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private selectedCategory: Category = null

    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    getAll(): Observable<Category[]> {
        return this.categoryRepository.getAll()
    }

    setSelectedCategory(category: Category) {
        this.selectedCategory = category
    }

    getSelectedCategory(): Category {
        return this.selectedCategory
    }
}
