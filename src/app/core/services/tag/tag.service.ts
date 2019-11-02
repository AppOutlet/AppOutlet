import { Injectable } from '@angular/core'
import { TagRepository } from '../../repository/tag/tag.repository'
import { Observable } from 'rxjs'
import { Tag } from '../../model/tag.model'

@Injectable({
    providedIn: 'root'
})
export class TagService {

    private selectedTag: Tag = null

    constructor(
        private tagRepository: TagRepository
    ) { }

    getAll(): Observable<Tag[]> {
        return this.tagRepository.getAll()
    }

    setSelectedTag(category: Tag) {
        this.selectedTag = category
    }

    getSelectedTag(): Tag {
        return this.selectedTag
    }
}
