import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardDto } from './card.dto';
import { Router } from '@angular/router';

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
}
