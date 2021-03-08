import { Component, OnInit } from '@angular/core';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application/application.service';

@Component({
    selector: 'app-recently-updated-apps',
    templateUrl: './recently-updated-apps.component.html',
    styleUrls: ['./recently-updated-apps.component.scss'],
})
export class RecentlyUpdatedAppsComponent implements OnInit {
    apps: Application[] = [];
    isLoading = false;

    constructor(private applicationService: ApplicationService) {}

    ngOnInit(): void {
        this.loadNext(0);
    }

    loadNext(currentPage: number): void {
        this.isLoading = true;
        this.applicationService
            .findByLastReleaseDate({ page: currentPage })
            .then((apps) => {
                this.apps.push(...apps);
                this.isLoading = false;
            });
    }
}
