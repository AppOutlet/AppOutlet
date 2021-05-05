import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-check-packages-modal',
    templateUrl: './check-packages-modal.component.html',
    styleUrls: ['./check-packages-modal.component.scss'],
})
export class CheckPackagesModalComponent {
    constructor(private dialogRef: NbDialogRef<CheckPackagesModalComponent>) {}

    proceedAnyway(): void {
        this.dialogRef.close(true);
    }

    dismiss(): void {
        this.dialogRef.close(false);
    }
}
