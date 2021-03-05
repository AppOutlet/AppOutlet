import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../service/application/application.service';
import { Application } from '../../../model/application.model';

@Component({
    selector: 'app-recently-added-apps',
    templateUrl: './recently-added-apps.component.html',
    styleUrls: ['./recently-added-apps.component.scss'],
})
export class RecentlyAddedAppsComponent implements OnInit {
    apps: Application[] = [];
    isLoading = false;

    constructor(private applicationService: ApplicationService) {}

    ngOnInit(): void {
        this.loadNext(1);
    }

    loadNext(currentPage: number): void {
        this.isLoading = true;
        this.applicationService
            .findByCreationDate({ page: currentPage })
            .then((apps) => {
                this.apps.push(...apps);
                this.isLoading = false;
            });
    }
}
