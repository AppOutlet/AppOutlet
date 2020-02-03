import { Injectable } from '@angular/core';
import { MainRouter } from './main.router';
import { MainComponent } from './main.component';
import { TagService } from '../../core/services/tag/tag.service';
import { Tag } from '../../core/model/tag.model';
import { SearchType } from '../../core/model/search-type';
import { EventBusService } from 'ngx-eventbus';
import { CategoryService } from '../../core/services/category/category.service';
import { Category } from '../../core/model/category.model';

@Injectable()
export class MainPresenter {

    private view: MainComponent;

    constructor(
        private router: MainRouter,
        private tagService: TagService,
        private eventBusService: EventBusService,
        private categoryService: CategoryService
    ) { }

    init(view: MainComponent) {
        this.view = view;
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService.getAll().subscribe(categoryList => {
            this.view.categoryList = categoryList;
        });
    }

    tagClicked(tag: Tag) {
        this.tagService.setSelectedTag(tag);
        this.eventBusService.triggerEvent('tagSelected', tag);
        this.router.goToSearchResult(SearchType.TAG);
    }

    categoryClicked(category: Category) {
        this.categoryService.setSelectedCategory(category);
        this.eventBusService.triggerEvent('categorySelected', category);
        this.router.goToSearchResult(SearchType.CATEGORY);
    }

    search(query: string) {
        if (this.isQueryValid(query)) {
            this.eventBusService.triggerEvent('queryTyped', query);
            this.router.goToSearchResult(SearchType.NAME, query);
        }
    }

    private isQueryValid(query: string): boolean {
        return query != null && query.length > 2;
    }
}
