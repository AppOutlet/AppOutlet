import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../model/category.model';

@Injectable({
    providedIn: "root"
})
export class CategoryService {

    constructor() { }

    getAll(): Observable<Category[]> {
        return of([
            { icon: 'apps', displayName: 'PAGES.MAIN.CATEGORY.OFFICE', name: 'Office' },
            { icon: 'at', displayName: 'PAGES.MAIN.CATEGORY.INTERNET_COMMUNICATION', name: 'Internet and Communication' },
            { icon: 'musical-notes', displayName: 'PAGES.MAIN.CATEGORY.AUDIO', name: 'Audio' },
            { icon: 'videocam', displayName: 'PAGES.MAIN.CATEGORY.VIDEO', name: 'Video' },
            { icon: 'logo-game-controller-b', displayName: 'PAGES.MAIN.CATEGORY.GAMES', name: 'Games' },
            { icon: 'code', displayName: 'PAGES.MAIN.CATEGORY.DEVELOPMENT', name: 'Development' },
            { icon: 'cash', displayName: 'PAGES.MAIN.CATEGORY.FINANCE', name: 'Finance' },
            { icon: 'images', displayName: 'PAGES.MAIN.CATEGORY.GRAPHICS', name: 'Graphics' },
            { icon: 'school', displayName: 'PAGES.MAIN.CATEGORY.SCIENCE_EDUCATION', name: 'Science and Education' },
            { icon: 'hammer', displayName: 'PAGES.MAIN.CATEGORY.UTILITY_PRODUCTIVITY', name: 'Utility and Productivity' },
            { icon: 'keypad', displayName: 'PAGES.MAIN.CATEGORY.MISCELLANEOUS', name: 'Miscellaneous' },
        ])
    }
}
