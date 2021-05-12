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
    isRecentlyAddedLoading = false;
    isRecentlyUpdatedLoading = false;

    constructor(
        private applicationService: ApplicationService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getRecentlyAddedApps();
        this.getRecentlyUpdatedApps();
    }

    private getRecentlyAddedApps(): void {
        this.isRecentlyAddedLoading = true;
        this.applicationService
            .getRecentlyAdded()
            .then((apps) => {
                this.recentlyAddedApps = apps;
                this.isRecentlyAddedLoading = false;
            })
            .catch((err) => {
                console.error(err);
                this.isRecentlyAddedLoading = false;
            });
    }

    private getRecentlyUpdatedApps(): void {
        this.isRecentlyUpdatedLoading = true;
        this.applicationService
            .getRecentlyUpdated()
            .then((apps) => {
                this.recentlyUpdatedApps = apps;
                this.isRecentlyUpdatedLoading = false;
            })
            .catch((err) => {
                console.error(err);
                this.isRecentlyUpdatedLoading = false;
            });
    }

    async showRecentlyAddedApps(): Promise<void> {
        await this.router.navigate(['recently-added']);
    }

    async showRecentlyUpdatedApps(): Promise<void> {
        await this.router.navigate(['recently-updated']);
    }
}
