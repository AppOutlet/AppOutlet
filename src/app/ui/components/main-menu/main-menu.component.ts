import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

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
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.OFFICE'),
                icon: 'layers-outline',
            },
            {
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.INTERNET_COMMUNICATION',
                ),
                icon: 'globe-2-outline',
            },
            {
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.AUDIO'),
                icon: { icon: 'music-outline' },
            },
            {
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.VIDEO'),
                icon: 'video-outline',
            },
            {
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.GAMES'),
                icon: 'cube-outline',
            },
            {
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.DEVELOPMENT',
                ),
                icon: 'code-outline',
            },
            {
                title: await this.getTranslation('PAGES.MAIN.CATEGORY.FINANCE'),
                icon: 'bar-chart-outline',
            },
            {
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.GRAPHICS',
                ),
                icon: 'image-outline',
            },
            {
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.SCIENCE_EDUCATION',
                ),
                icon: 'book-outline',
            },
            {
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.UTILITY_PRODUCTIVITY',
                ),
                icon: 'bulb-outline',
            },
            {
                title: await this.getTranslation(
                    'PAGES.MAIN.CATEGORY.MISCELLANEOUS',
                ),
                icon: 'grid-outline',
            },
        ];
    }

    private getTranslation(key: string): Promise<string> {
        return this.translationService.get(key).toPromise();
    }
}
