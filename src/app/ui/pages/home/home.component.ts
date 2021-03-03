import { Component, OnInit } from '@angular/core';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application/application.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    recentlyUpdatedApps = [];
    recentlyAddedApps: Application[] = [];

    constructor(private applicationService: ApplicationService) {}

    ngOnInit(): void {
        this.getRecentlyAddedApps();
    }

    private getRecentlyAddedApps() {
        this.applicationService.getRecentlyAdded().then((apps) => {
            this.recentlyAddedApps = apps;
        });
    }
}
