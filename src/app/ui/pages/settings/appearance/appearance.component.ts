import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { SettingsService } from '../../../../service/settings/settings.service';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss'],
})
export class AppearanceComponent implements OnInit {
    private readonly THEME_DEFAULT = 'system';
    selectedTheme?: string;

    constructor(
        private themeService: NbThemeService,
        private settingsService: SettingsService,
    ) {}

    ngOnInit(): void {
        this.getSavedTheme().then();
    }

    private async getSavedTheme(): Promise<void> {
        const savedTheme = await this.settingsService.getTheme();
        this.selectedTheme = savedTheme ?? this.THEME_DEFAULT;
    }

    async onThemeChange(selectedTheme: string): Promise<void> {
        return this.settingsService.setTheme(selectedTheme).then(() => {
            let theme = selectedTheme;

            if (theme == this.THEME_DEFAULT) {
                theme = this.getSystemTheme();
            }

            this.themeService.changeTheme(theme);
        });
    }

    private getSystemTheme(): string {
        if (this.isDarkTheme()) {
            return 'dark';
        } else {
            return 'default';
        }
    }

    private isDarkTheme(): boolean {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
