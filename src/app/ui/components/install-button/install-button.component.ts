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
    private wasInstalled = false;

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
                this.wasInstalled = false;
                break;

            case ApplicationStatus.INSTALLED:
                this.buttonStatus = 'danger';
                this.buttonText = 'PAGES.APP_DETAIL.UNINSTALL';
                this.buttonIcon = 'trash-outline';
                this.buttonEnabled = true;
                this.shouldShowButtonIcon = true;
                this.loading = false;
                this.wasInstalled = true;
                break;

            case ApplicationStatus.INSTALLING:
                this.buttonText = this.getProcessingButtonText();
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

    private getProcessingButtonText(): string {
        if (this.wasInstalled) {
            return 'PAGES.APP_DETAIL.UNINSTALLING';
        } else {
            return 'PAGES.APP_DETAIL.INSTALLING';
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
