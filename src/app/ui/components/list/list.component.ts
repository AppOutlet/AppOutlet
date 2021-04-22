import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { CardDto } from '../card/card.dto';
import { ScrollEvent } from './ScrollEvent';
import { WindowRef } from '../../../util/window-ref';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnChanges {
    private readonly SCROLL_THRESHOLD = 0.9;

    @Input() title = '';
    @Input() apps: CardDto[] = [];
    @Input() loading = false;
    @Input() numberOfPages = Number.MAX_SAFE_INTEGER;

    @Output() applicationClicked = new EventEmitter<CardDto>();
    @Output() nextPageNeeded = new EventEmitter<number>();

    private currentPage = 0;

    constructor(private window: WindowRef) {}

    @HostListener('window:scroll', ['$event'])
    onListScroll(event: ScrollEvent): void {
        if (!event.target) {
            return;
        }

        const scrollHeight = event.target.scrollingElement.scrollHeight;
        const scrollTop = event.target.scrollingElement.scrollTop;
        const height = this.window.nativeWindow.innerHeight;
        const overflowRate = height / (scrollHeight - scrollTop);

        if (this.shouldLoadNextPage(overflowRate)) {
            this.loadNext();
        }
    }

    private shouldLoadNextPage(overflowRate: number): boolean {
        return (
            overflowRate > this.SCROLL_THRESHOLD &&
            !this.loading &&
            this.currentPage < this.numberOfPages
        );
    }

    onAppClicked(app: CardDto): void {
        this.applicationClicked.emit(app);
    }

    private loadNext(): void {
        this.currentPage++;
        this.nextPageNeeded.emit(this.currentPage);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.apps.currentValue.length === 0) {
            this.currentPage = 0;
        }
    }
}
