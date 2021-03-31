import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { SettingsService } from '../../../../service/settings/settings.service';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss'],
})
export class AppearanceComponent {
    selectedTheme = 'default';

    constructor(
        private themeService: NbThemeService,
        private settingsService: SettingsService,
    ) {}

    onThemeChange(selectedTheme: string): void {
        this.settingsService.setTheme(selectedTheme).then(() => {
            this.themeService.changeTheme(selectedTheme);
        });
    }
}
