import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import { CardDto } from '../card/card.dto';
import { ScrollEvent } from './ScrollEvent';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent {
    private readonly SCROLL_THRESHOLD = 0.9;

    @Input() title = '';
    @Input() apps: CardDto[] = [];
    @Input() loading = false;

    @Output() applicationClicked = new EventEmitter<CardDto>();
    @Output() nextPageNeeded = new EventEmitter<number>();

    private currentPage = 1;

    @HostListener('window:scroll', ['$event'])
    onListScroll(event: ScrollEvent): void {
        const scrollHeight = event?.target?.scrollingElement?.scrollHeight ?? 0;
        const scrollTop = event?.target?.scrollingElement?.scrollTop ?? 0;
        const height = window.innerHeight ?? 0;
        const overflowRate = height / (scrollHeight - scrollTop);

        if (overflowRate > this.SCROLL_THRESHOLD && !this.loading) {
            this.loadNext();
        }
    }

    onAppClicked(app?: CardDto): void {
        if (app) {
            this.applicationClicked.emit(app);
        }
    }

    private loadNext(): void {
        this.currentPage++;
        this.nextPageNeeded.emit(this.currentPage);
    }
}
