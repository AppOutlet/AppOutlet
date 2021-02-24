import { Component } from '@angular/core';
import { CardDto } from '../card/card.dto';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
    apps: CardDto[] = [];
}
