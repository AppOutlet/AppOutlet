import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../service/application/application.service';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Application } from '../../../model/application.model';
import { CoreService } from '../../../service/core/core.service';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
    application?: Application;

    constructor(
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private location: Location,
        private coreService: CoreService,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(map((parameters) => parameters.get('id')))
            .subscribe((id) => this.loadApplication(id));
    }

    private loadApplication(id: string | null): void {
        if (!id) {
            return;
        }

        this.applicationService.findById(id).then((app) => {
            this.application = app;
        });
    }

    goBack(): void {
        this.location.back();
    }

    async openUrl(url?: string): Promise<void> {
        if (url) {
            await this.coreService.openLinkOnBrowser(url);
        }
    }

    async openStorePage(): Promise<void> {
        let url: string | undefined;

        switch (this.application?.store) {
            case 'FLATHUB':
                url = `https://flathub.org/apps/details/${this.application?.id}`;
                break;
            case 'SNAP_STORE':
                url = `https://snapcraft.io/${this.application?.packageName}`;
                break;
            case 'APP_IMAGE_HUB':
                url = `https://appimage.github.io/${this.application?.name}`;
                break;
        }

        if (url) {
            await this.openUrl(url);
        }
    }
}
