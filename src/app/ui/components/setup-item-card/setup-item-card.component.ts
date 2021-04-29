import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardStatus } from './card-status';

@Component({
    selector: 'app-setup-item-card',
    templateUrl: './setup-item-card.component.html',
    styleUrls: ['./setup-item-card.component.scss'],
})
export class SetupItemCardComponent {
    @Input() itemName?: string;
    @Input() installButtonText?: string;
    @Input() tryAgainButtonText?: string;
    @Input() status = CardStatus.LOADING;
    @Output() installClicked = new EventEmitter<void>();
    @Output() tryAgainClicked = new EventEmitter<void>();

    onInstallClicked(): void {
        this.installClicked.emit();
    }

    onTryAgainClicked(): void {
        this.tryAgainClicked.emit();
    }
}
