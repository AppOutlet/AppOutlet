import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import { GithubService } from '../github/github.service';
import * as PackageType from '../../../../core/model/PackageType';
import { Release } from '../github/github-models';

@Injectable({
    providedIn: 'root',
})
export class AppImageService {
    constructor(private githubService: GithubService) {}

    getAppImageInformation(application: Application): Promise<Application> {
        if (application.packageType !== PackageType.APP_IMAGE) {
            console.error(
                'Trying to get AppImage information from a non AppImage application',
            );
            return Promise.resolve(application);
        }

        return this.githubService
            .getRepositoryData(application)
            .then((repositoryData) =>
                this.githubService.getLastRelease(repositoryData),
            )
            .then((release) =>
                this.mergeReleaseDataToApplication(release, application),
            );
    }

    private mergeReleaseDataToApplication(
        releaseData: Release,
        application: Application,
    ): Application {
        return application;
    }
}
