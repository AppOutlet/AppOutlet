import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../service/application/application.service';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Application } from '../../../model/application.model';
import { CoreService } from '../../../service/core/core.service';
import { ApplicationStatus } from '../../../model/application-status';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit, OnDestroy {
    static readonly FLATHUB_APPLICATION_BASE_URL =
        'https://flathub.org/apps/details';
    static readonly SNAP_STORE_APPLICATION_BASE_URL = 'https://snapcraft.io';
    static readonly APP_IMAGE_HUB_APPLICATION_BASE_URL =
        'https://appimage.github.io';

    application?: Application;
    applicationStatus?: ApplicationStatus;
    isIndefinite = true;
    installationPercentage = 0;
    private applicationListenerSubscription?: Subscription;

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
            this.syncApplicationStatus(app);
            this.listenToApplicationChanges(app);
        });
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
                url = `${ApplicationComponent.FLATHUB_APPLICATION_BASE_URL}/${this.application?.id}`;
                break;
            case 'SNAP_STORE':
                url = `${ApplicationComponent.SNAP_STORE_APPLICATION_BASE_URL}/${this.application?.packageName}`;
                break;
            case 'APP_IMAGE_HUB':
                url = `${ApplicationComponent.APP_IMAGE_HUB_APPLICATION_BASE_URL}/${this.application?.name}`;
                break;
        }

        if (url) {
            await this.openUrl(url);
        }
    }

    async install(application?: Application): Promise<void> {
        if (application) {
            await this.applicationService.install(application);
            await this.syncApplicationStatus(application);
        }
    }

    async uninstall(application?: Application): Promise<void> {
        if (application) {
            await this.applicationService.uninstall(application);
        }
    }

    async syncApplicationStatus(application: Application): Promise<void> {
        this.applicationStatus = await this.applicationService.getApplicationStatus(
            application,
        );
    }

    private listenToApplicationChanges(application: Application): void {
        this.applicationListenerSubscription = this.applicationService
            .getApplicationListener(application)
            .subscribe((processInfo) => {
                if (processInfo.completePercentage) {
                    this.isIndefinite = false;
                    this.installationPercentage =
                        processInfo.completePercentage;
                }
                this.syncApplicationStatus(application);
            });
    }

    ngOnDestroy(): void {
        this.applicationListenerSubscription?.unsubscribe();
    }
}
