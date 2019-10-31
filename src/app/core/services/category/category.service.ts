import { Injectable } from '@angular/core'
import { CategoryRepository } from '../../repository/category/category.repository'
import { Observable } from 'rxjs'
import { Tag } from '../../model/tag.model'

@Injectable({
    providedIn: 'root'
})
export class TagService {

    private selectedTag: Tag = null

    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    getAll(): Observable<Tag[]> {
        return this.categoryRepository.getAll()
    }

    setSelectedTag(category: Tag) {
        this.selectedTag = category
    }

    getSelectedTag(): Tag {
        return this.selectedTag
    }
}
