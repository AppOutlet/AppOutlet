import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import { CoreService } from '../core/core.service';
import * as Channel from '../../../../core/interface/InterfaceChannel';
import { SearchParameters } from '../../model/search-parameters.model';
import { ProcessService } from '../process/process.service';
import { ApplicationStatus } from '../../model/application-status';
import { Observable } from 'rxjs';
import { ProcessInfo } from '../process/process-info';
import * as PackageType from '../../../../core/model/PackageType';
import { AppImageService } from '../appimage/app-image.service';
import { ApplicationResponse } from '../../model/application-response.model';

function shouldGetAppOutletInformation(application: Application): boolean {
    return (
        application.packageType === PackageType.APP_IMAGE &&
        (application.downloadUrl === '' || application.downloadUrl == null)
    );
}

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(
        private coreService: CoreService,
        private processService: ProcessService,
        private appImageService: AppImageService,
    ) {}

    getRecentlyAdded(): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.getRecentlyAdded,
        );
    }

    getRecentlyUpdated(): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.getRecentlyUpdated,
        );
    }

    findByCreationDate(
        searchParameters: SearchParameters,
    ): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.findByCreationDate,
            searchParameters,
        );
    }

    findByLastReleaseDate(
        searchParameters: SearchParameters,
    ): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.findByLastReleaseDate,
            searchParameters,
        );
    }

    findByCategory(searchParameters: SearchParameters): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.findByCategory,
            searchParameters,
        );
    }

    findById(id: string): Promise<Application> {
        return this.coreService
            .invoke<Application>(Channel.application.findById, id)
            .then((application) => {
                if (shouldGetAppOutletInformation(application)) {
                    return this.getAppImageInformation(application);
                } else {
                    return application;
                }
            });
    }

    private getAppImageInformation(
        application: Application,
    ): Promise<Application> {
        return this.appImageService
            .getAppImageInformation(application)
            .then((app) => this.save(app));
    }

    findByTerm(
        searchParameters: SearchParameters,
    ): Promise<ApplicationResponse> {
        return this.coreService.invoke<ApplicationResponse>(
            Channel.application.searchByTerm,
            searchParameters,
        );
    }

    install(application: Application): Promise<void> {
        return this.processService.installApplication(application);
    }

    getApplicationStatus(application: Application): Promise<ApplicationStatus> {
        return this.processService.getApplicationStatus(application);
    }

    getApplicationListener(application: Application): Observable<ProcessInfo> {
        return this.processService.getProcessListener(application.id);
    }

    async uninstall(application: Application): Promise<void> {
        return this.processService.uninstallApplication(application);
    }

    save(application: Application): Promise<Application> {
        return this.coreService.invoke<Application>(
            Channel.application.save,
            application,
        );
    }
}
