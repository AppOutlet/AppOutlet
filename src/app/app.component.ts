import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './service/settings/settings.service';
import { NbThemeService } from '@nebular/theme';
import { WindowRef } from './util/window-ref';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private translateService: TranslateService,
        private settingsService: SettingsService,
        private themeService: NbThemeService,
        private windowRef: WindowRef,
    ) {}

    ngOnInit(): void {
        this.setupTranslation();
        this.setupTheme().then();
    }

    private setupTranslation(): void {
        this.translateService.use(
            this.windowRef.nativeWindow.navigator.language,
        );
    }

    private async setupTheme(): Promise<void> {
        const theme = await this.settingsService.getTheme();
        this.themeService.changeTheme(theme ?? 'default');
    }
}
