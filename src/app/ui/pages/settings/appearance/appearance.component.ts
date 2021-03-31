import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss'],
})
export class AppearanceComponent {
    selectedTheme = 'default';

    constructor(private themeService: NbThemeService) {}

    onThemeChange(selectedTheme: string): void {
        this.themeService.changeTheme(selectedTheme);
    }
}
