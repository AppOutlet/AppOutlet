import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import { GithubService } from '../github/github.service';
import * as PackageType from '../../../../core/model/PackageType';
import { Release } from '../github/github-models';

@Injectable({
    providedIn: 'root',
})
export class AppImageService {
    private static readonly APP_IMAGE_EXTENSION = '.AppImage';

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
    ): Promise<Application> {
        const downloadUrl = this.getDownloadUrl(releaseData);
        if (!downloadUrl) {
            return Promise.reject(
                `Cannot get download url from ${application.name}`,
            );
        }

        application.downloadUrl = downloadUrl;
        application.version = releaseData.tag_name;

        return Promise.resolve(application);
    }

    private getDownloadUrl(release: Release): string | undefined {
        const appImageAsset = release.assets?.find((asset) =>
            asset.name?.endsWith(AppImageService.APP_IMAGE_EXTENSION),
        );

        return appImageAsset?.browser_download_url;
    }
}
