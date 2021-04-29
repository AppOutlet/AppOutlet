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
        this.checkIfFlatpakIsIntalled();
        this.checkIfSnapdIsIntalled();
    }

    private checkIfSnapdIsIntalled(): void {
        this.setupService.checkIfSnapdIsIntalled();
    }

    private checkIfFlatpakIsIntalled(): void {
        this.setupService.checkIfFlatpakIsIntalled();
    }

    installSnapd(): void {
        this.setupService.installSnapd().then();
    }

    installFlatpak(): void {
        this.setupService.installFlatpak().then();
    }
}
