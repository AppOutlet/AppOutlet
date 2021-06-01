import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { NbMenuItem, NbSearchService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    shouldShowBackButton = false;
    contextMenuItems: NbMenuItem[] = [];

    constructor(
        private location: Location,
        private router: Router,
        private searchService: NbSearchService,
        private translateService: TranslateService,
    ) {}

    ngOnInit(): void {
        this.setupRouterEventsListener();
        this.setupSearchListener();
        this.setupContextMenuItems().then();
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

    private async setupContextMenuItems(): Promise<void> {
        this.contextMenuItems = [
            {
                title: await this.getTranslation('PAGES.GET_INVOLVED.TITLE'),
                icon: 'people-outline',
                link: 'get-involved',
            },
            {
                title: await this.getTranslation('PAGES.SETTINGS.TITLE'),
                icon: 'settings-outline',
                link: 'settings',
            },
        ];
    }

    private getTranslation(key: string): Promise<string> {
        return this.translateService.get(key).toPromise();
    }

    goBack(): void {
        this.location.back();
    }
}
