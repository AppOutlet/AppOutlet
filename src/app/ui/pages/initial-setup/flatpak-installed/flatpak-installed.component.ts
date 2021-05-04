import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SetupService } from '../../../../service/setup/setup.service';

@Component({
    selector: 'app-flatpak-installed',
    templateUrl: './flatpak-installed.component.html',
    styleUrls: ['./flatpak-installed.component.scss'],
})
export class FlatpakInstalledComponent {
    constructor(
        private dialogRef: NbDialogRef<FlatpakInstalledComponent>,
        private setupService: SetupService,
    ) {}

    dismiss(): void {
        this.dialogRef.close();
    }

    restart(): void {
        this.setupService.restart().then();
    }
}
