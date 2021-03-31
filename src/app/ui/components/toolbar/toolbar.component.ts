import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { NbSearchService } from '@nebular/theme';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    shouldShowBackButton = false;

    constructor(
        private location: Location,
        private router: Router,
        private searchService: NbSearchService,
    ) {}

    ngOnInit(): void {
        this.setupRouterEventsListener();
        this.setupSearchListener();
    }

    private setupRouterEventsListener(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.shouldShowBackButton = event.url !== '/';
            }
        });
    }

    private setupSearchListener(): void {
        this.searchService.onSearchSubmit().subscribe((searchResult) => {
            this.navigateToSearch(searchResult.term).then();
        });
    }

    private async navigateToSearch(searchTerm: string): Promise<void> {
        await this.router.navigate(['search', searchTerm]);
    }

    goBack(): void {
        this.location.back();
    }

    async goToSettings(): Promise<void> {
        await this.router.navigate(['settings']);
    }
}
