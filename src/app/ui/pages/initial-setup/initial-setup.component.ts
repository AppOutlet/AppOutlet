import { Component, OnInit } from '@angular/core';
import { CardStatus } from '../../components/setup-item-card/card-status';
import { SetupService } from '../../../service/setup/setup.service';

@Component({
    selector: 'app-initial-setup',
    templateUrl: './initial-setup.component.html',
    styleUrls: ['./initial-setup.component.scss'],
})
export class InitialSetupComponent implements OnInit {
    snapdStatus = CardStatus.NOT_INSTALLED;
    flatpakStatus = CardStatus.NOT_INSTALLED;

    constructor(private setupService: SetupService) {}

    ngOnInit(): void {
        this.checkSetup();
    }

    private checkSetup(): void {
        this.checkIfFlatpakIsInstalled();
        this.checkIfSnapdIsInstalled();
    }

    private checkIfSnapdIsInstalled(): void {
        this.snapdStatus = CardStatus.LOADING;
        this.setupService
            .checkIfSnapdIsInstalled()
            .then(() => {
                this.snapdStatus = CardStatus.INSTALLED;
            })
            .catch(() => {
                this.snapdStatus = CardStatus.NOT_INSTALLED;
            });
    }

    private checkIfFlatpakIsInstalled(): void {
        this.flatpakStatus = CardStatus.LOADING;
        this.setupService
            .checkIfFlatpakIsInstalled()
            .then(() => {
                this.flatpakStatus = CardStatus.INSTALLED;
            })
            .catch(() => {
                this.flatpakStatus = CardStatus.NOT_INSTALLED;
            });
    }

    installSnapd(): void {
        this.setupService.installSnapd().then();
    }

    installFlatpak(): void {
        this.setupService.installFlatpak().then();
    }
}
