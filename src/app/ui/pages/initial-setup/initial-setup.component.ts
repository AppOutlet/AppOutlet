import { Component, OnInit } from '@angular/core';
import { CardStatus } from '../../components/setup-item-card/card-status';
import { SetupService } from '../../../service/setup/setup.service';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { FlatpakInstalledComponent } from './flatpak-installed/flatpak-installed.component';
import { CheckPackagesModalComponent } from './check-packages-modal/check-packages-modal.component';

@Component({
    selector: 'app-initial-setup',
    templateUrl: './initial-setup.component.html',
    styleUrls: ['./initial-setup.component.scss'],
})
export class InitialSetupComponent implements OnInit {
    private wasFlatpakInstalled = false;
    snapdStatus = CardStatus.NOT_INSTALLED;
    flatpakStatus = CardStatus.NOT_INSTALLED;

    constructor(
        private setupService: SetupService,
        private router: Router,
        private dialogService: NbDialogService,
    ) {}

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
        this.snapdStatus = CardStatus.INSTALLING;
        this.setupService
            .installSnapd()
            .then((result) => {
                console.log(result);
                this.snapdStatus = CardStatus.INSTALLED;
            })
            .catch((err) => {
                console.error(err);
                this.snapdStatus = CardStatus.ERROR;
            });
    }

    installFlatpak(): void {
        this.flatpakStatus = CardStatus.INSTALLING;
        this.setupService
            .installFlatpak()
            .then((result) => {
                console.log(result);
                this.flatpakStatus = CardStatus.INSTALLED;
                this.wasFlatpakInstalled = true;
                this.openRestartModal();
            })
            .catch((err) => {
                console.error(err);
                this.flatpakStatus = CardStatus.ERROR;
            });
    }

    goToMain(force = false): void {
        if (force || this.shouldGoToMainDirectly()) {
            this.router.navigate(['']).then();
        } else {
            this.openCheckPackagesModal();
        }
    }

    private openCheckPackagesModal(): void {
        this.dialogService
            .open(CheckPackagesModalComponent)
            .onClose.subscribe((proceedAnyway) => {
                if (proceedAnyway) {
                    this.goToMain(true);
                }
            });
    }

    private shouldGoToMainDirectly(): boolean {
        return (
            this.snapdStatus === CardStatus.INSTALLED &&
            this.flatpakStatus === CardStatus.INSTALLED
        );
    }

    private openRestartModal(): void {
        this.dialogService.open(FlatpakInstalledComponent);
    }
}
