import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardDto } from '../card/card.dto';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
    @Input() title = '';
    @Input() apps: CardDto[] = [];

    @Output() seeMoreClicked = new EventEmitter<void>();
    @Output() applicationClicked = new EventEmitter<CardDto>();

    onSeeMoreClicked(): void {
        this.seeMoreClicked.emit();
    }

    onAppClicked(app?: CardDto): void {
        if (app) {
            this.applicationClicked.emit(app);
        }
    }
}
