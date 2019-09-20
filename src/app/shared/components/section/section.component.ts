import { Component, OnInit, Input } from '@angular/core'
import { Section } from '../../../core/model/section.model'

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class SectionComponent {

    @Input() section: Section

    private CARD_WIDTH = 350

    constructor() { }

    scrollBack(element) {
        element.scrollLeft -= 3 * this.CARD_WIDTH
    }

    scrollFoward(element) {
        element.scrollLeft += 3 * this.CARD_WIDTH
    }
}
