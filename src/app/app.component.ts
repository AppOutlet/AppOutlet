import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './service/settings/settings.service';
import { NbThemeService } from '@nebular/theme';
import { WindowRef } from './util/window-ref';
import { Router } from '@angular/router';

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
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.setupTranslation();
        this.setupTheme().then();
        this.openInitialSetupIfNecessary();
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

    private openInitialSetupIfNecessary(): void {
        this.settingsService.getLastSynchronizationDate().then((date) => {
            if (date) {
                return this.goToInitialSetup();
            }
        });
    }

    private goToInitialSetup(): void {
        this.router.navigate(['setup']).then();
    }
}
