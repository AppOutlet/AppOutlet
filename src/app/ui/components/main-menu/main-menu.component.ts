import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

import { routes } from '../../../util/routes';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
    constructor(private translationService: TranslateService) {}

    items: NbMenuItem[] = [];

    ngOnInit(): void {
        this.setupMenuItems();
    }

    async setupMenuItems(): Promise<void> {
        this.items = [
            {
                link: '/home',
                title: await this.getTranslation('PAGES.HOME.TITLE'),
                icon: 'home-outline',
                home: true,
            },
            {
                link: routes.category.office,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.OFFICE'),
                icon: 'layers-outline',
            },
            {
                link: routes.category.internet,
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.INTERNET',
                ),
                icon: 'globe-2-outline',
            },
            {
                link: routes.category.audio,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.AUDIO'),
                icon: { icon: 'music-outline' },
            },
            {
                link: routes.category.video,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.VIDEO'),
                icon: 'video-outline',
            },
            {
                link: routes.category.games,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.GAMES'),
                icon: 'cube-outline',
            },
            {
                link: routes.category.development,
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.DEVELOPMENT',
                ),
                icon: 'code-outline',
            },
            {
                link: routes.category.finance,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.FINANCE'),
                icon: 'bar-chart-outline',
            },
            {
                link: routes.category.graphics,
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.GRAPHICS',
                ),
                icon: 'image-outline',
            },
            {
                link: routes.category.science,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.SCIENCE'),
                icon: 'book-outline',
            },
            {
                link: routes.category.utility,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.UTILITY'),
                icon: 'bulb-outline',
            },
            {
                link: routes.category.misc,
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.MISC'),
                icon: 'grid-outline',
            },
        ];
    }

    private getTranslation(key: string): Promise<string> {
        return this.translationService.get(key).toPromise();
    }
}
