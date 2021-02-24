import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardDto } from './card.dto';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() application?: CardDto = undefined;

    @Output() applicationClicked = new EventEmitter<CardDto>();

    click(app?: CardDto): void {
        if (app) {
            this.applicationClicked.emit(app);
        }
    }
}
