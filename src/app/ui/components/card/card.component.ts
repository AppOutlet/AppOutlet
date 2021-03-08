import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CardDto } from './card.dto';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() application?: CardDto = undefined;

    @Output() applicationClicked = new EventEmitter<CardDto>();

    constructor(private router: Router) {}

    async click(app?: CardDto): Promise<void> {
        if (app) {
            this.applicationClicked.emit(app);
        }

        await this.router.navigate(['application', app?.id]);
    }

    getPackageIcon(packageType?: string): string {
        switch (packageType) {
            case 'SNAP':
                return 'assets/icon/snap.png';
            case 'FLATPAK':
                return 'assets/icon/flatpak.png';
            case 'APP_IMAGE':
                return 'assets/icon/appimage.png';
            default:
                return '';
        }
    }
}
