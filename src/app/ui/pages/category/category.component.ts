import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application/application.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    apps: Application[] = [];
    category = '';
    isLoading = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(map((paramMap: ParamMap) => paramMap.get('category')))
            .subscribe((category) => this.handleCategory(category));
    }

    private handleCategory(category?: string | null): void {
        if (!category) {
            return;
        }

        this.category = category;

        this.loadApps();
    }

    loadApps(page = 0): void {
        const shouldResetList = page === 0;
        this.isLoading = true;
        this.applicationService
            .findByCategory({
                page,
                category: this.category,
            })
            .then((apps) => {
                if (shouldResetList) {
                    this.apps = [];
                }

                this.apps.push(...apps);
                this.isLoading = false;
            });
    }
}
