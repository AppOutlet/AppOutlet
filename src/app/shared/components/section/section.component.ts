import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Section } from '../../../core/model/section.model'
import { App } from '../../../core/model/app.model'

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
export class SectionComponent {

    @Input() section: Section

    @Output() reload: EventEmitter<any> = new EventEmitter()
    @Output() appClicked: EventEmitter<App> = new EventEmitter()

    private CARD_WIDTH = 350

    constructor() {
    }

    scrollBack(element) {
        element.scrollLeft -= this.CARD_WIDTH
    }

    scrollFoward(element) {
        element.scrollLeft += this.CARD_WIDTH
    }

    doReload() {
        this.reload.emit()
    }

    onAppClicked(app: App) {
        this.appClicked.emit(app)
    }
}
