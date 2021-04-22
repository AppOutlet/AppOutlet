import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApplicationService } from '../../../service/application/application.service';
import { Application } from '../../../model/application.model';
import { map } from 'rxjs/operators';
import { SearchParameters } from '../../../model/search-parameters.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    apps: Application[] = [];
    searchTerm?: string;
    loading = false;
    numberOfPages = Number.MAX_SAFE_INTEGER;

    constructor(
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
    ) {}

    ngOnInit(): void {
        this.setupParameterListener();
    }

    private setupParameterListener(): void {
        this.activatedRoute.paramMap
            .pipe(map((paramMap: ParamMap) => paramMap.get('searchTerm')))
            .subscribe((searchTerm) => this.handleSearchTerm(searchTerm));
    }

    private handleSearchTerm(searchTerm: string | null): void {
        if (!searchTerm) {
            return;
        }

        this.searchTerm = searchTerm;
        this.apps = [];
        this.getApplications(0);
    }

    getApplications(currentPage: number): void {
        const searchParameters: SearchParameters = {
            page: currentPage,
            searchTerm: this.searchTerm,
        };

        this.loading = true;

        this.applicationService
            .findByTerm(searchParameters)
            .then((response) => {
                this.numberOfPages = response.numberOfPages;
                this.apps.push(...response.apps);
                this.loading = false;
            });
    }
}
