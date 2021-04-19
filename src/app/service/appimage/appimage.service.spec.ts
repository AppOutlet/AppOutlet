import { TestBed } from '@angular/core/testing';

import { AppImageService } from './app-image.service';
import { GithubService } from '../github/github.service';
import { Application } from '../../model/application.model';
import * as PackageType from '../../../../core/model/PackageType';
import { Release } from '../github/github-models';

describe('AppImageService', () => {
    let service: AppImageService;

    let application: Application;

    const mockGithubService = {
        getLastRelease: jest.fn(),
        getRepositoryData: jest.fn(),
    };

    function lastReleaseShouldReturn(release: Release): void {
        mockGithubService.getRepositoryData.mockReturnValue(Promise.resolve());
        mockGithubService.getLastRelease.mockReturnValue(
            Promise.resolve(release),
        );
    }

    beforeEach(() => {
        application = {
            id: 'Application id',
            name: 'application name',
            packageType: PackageType.APP_IMAGE,
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: GithubService, useValue: mockGithubService },
            ],
        });
        service = TestBed.inject(AppImageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get app image information', async () => {
        const release: Release = {
            name: 'release-name',
            tag_name: 'tag name',
            assets: [
                { name: 'asset name.AppImage', browser_download_url: 'url' },
            ],
        };

        const expected: Application = {
            ...application,
            downloadUrl: release.assets?.[0]?.browser_download_url ?? '',
            version: release.tag_name,
        };

        lastReleaseShouldReturn(release);

        const result = await service.getAppImageInformation(application);

        expect(result).toEqual(expected);
    });

    it('should return the same application if it is not AppImage', async () => {
        application.packageType = PackageType.SNAP;

        const result = await service.getAppImageInformation(application);

        expect(result).toEqual(application);
        expect(mockGithubService.getRepositoryData.mock.calls.length).toBe(0);
    });

    it('should reject if we cannot get the download url', (done) => {
        const release: Release = {
            name: 'release-name',
            tag_name: 'tag name',
            assets: [
                {
                    name: 'asset name',
                    browser_download_url: undefined,
                },
                {
                    name: undefined,
                    browser_download_url: undefined,
                },
            ],
        };

        lastReleaseShouldReturn(release);

        service
            .getAppImageInformation(application)
            .then(() => {
                fail('Should not get here');
            })
            .catch((err) => {
                expect(err).toBeDefined();
                done();
            });
    });

    it('should reject if release has not assets', (done) => {
        const release: Release = {
            name: 'release-name',
            tag_name: 'tag name',
        };

        lastReleaseShouldReturn(release);

        service
            .getAppImageInformation(application)
            .then(() => {
                fail('Should not get here');
            })
            .catch((err) => {
                expect(err).toBeDefined();
                done();
            });
    });
});
