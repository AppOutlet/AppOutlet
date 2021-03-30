import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ApplicationStatus } from '../../../model/application-status';

@Component({
    selector: 'app-install-button',
    templateUrl: './install-button.component.html',
    styleUrls: ['./install-button.component.scss'],
})
export class InstallButtonComponent implements OnChanges {
    @Input() applicationStatus?: ApplicationStatus;
    @Input() installationPercentage = 0;
    @Input() isIndefinite = true;
    @Output() installClicked = new EventEmitter<void>();
    @Output() uninstallClicked = new EventEmitter<void>();

    buttonStatus = 'basic';
    buttonText = '';
    buttonIcon = '';
    buttonEnabled = true;
    shouldShowButtonIcon = true;
    loading = false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ngOnChanges(changes?: SimpleChanges): void {
        this.updateButtonAppearance();
    }

    private updateButtonAppearance(): void {
        switch (this.applicationStatus) {
            case ApplicationStatus.NOT_INSTALLED:
                this.buttonStatus = 'success';
                this.buttonText = 'PAGES.APP_DETAIL.INSTALL';
                this.buttonIcon = 'download-outline';
                this.buttonEnabled = true;
                this.shouldShowButtonIcon = true;
                this.loading = false;
                break;

            case ApplicationStatus.INSTALLED:
                this.buttonStatus = 'danger';
                this.buttonText = 'PAGES.APP_DETAIL.UNINSTALL';
                this.buttonIcon = 'trash-outline';
                this.buttonEnabled = true;
                this.shouldShowButtonIcon = true;
                this.loading = false;
                break;

            case ApplicationStatus.INSTALLING:
                this.buttonText = 'PAGES.APP_DETAIL.INSTALLING';
                this.buttonStatus = 'basic';
                this.buttonEnabled = false;
                this.shouldShowButtonIcon = false;
                this.loading = true;
                break;

            default:
                this.buttonStatus = 'basic';
                this.buttonText = '';
        }
    }

    onClick(): void {
        switch (this.applicationStatus) {
            case ApplicationStatus.NOT_INSTALLED:
                this.installClicked.emit();
                break;

            case ApplicationStatus.INSTALLED:
                this.uninstallClicked.emit();
                break;
        }
    }
}
