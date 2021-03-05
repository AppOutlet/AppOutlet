import { Component, OnInit } from '@angular/core';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application/application.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    recentlyUpdatedApps: Application[] = [];
    recentlyAddedApps: Application[] = [];

    constructor(
        private applicationService: ApplicationService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getRecentlyAddedApps();
        this.getRecentlyUpdatedApps();
    }

    private getRecentlyAddedApps(): void {
        this.applicationService.getRecentlyAdded().then((apps) => {
            this.recentlyAddedApps = apps;
        });
    }

    private getRecentlyUpdatedApps(): void {
        this.applicationService.getRecentlyUpdated().then((apps) => {
            this.recentlyUpdatedApps = apps;
        });
    }

    async showRecentlyAddedApps(): Promise<void> {
        await this.router.navigate(['recently-added']);
    }

    async showRecentlyUpdatedApps(): Promise<void> {
        await this.router.navigate(['recently-updated']);
    }
}
