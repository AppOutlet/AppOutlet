import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WindowRef } from '../../../util/window-ref';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnChanges {
    private readonly TIMER = 7000;

    @Input() images?: string[];

    currentImage?: string;

    private intervalId?: number;
    private shouldChangeImage = true;

    constructor(private window: WindowRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.intervalId) {
            this.window.nativeWindow.clearInterval(this.intervalId);
        }

        this.intervalId = this.window.nativeWindow.setInterval(() => {
            if (changes.images.currentValue) {
                this.handleImages();
            }
        }, this.TIMER);
    }

    private handleImages(): void {
        if (!this.shouldChangeImage || !this.images) {
            return;
        }

        if (!this.currentImage) {
            this.currentImage = this.images[0];
        } else {
            let nextIndex = this.images.indexOf(this.currentImage) + 1;

            if (nextIndex === this.images.length) {
                nextIndex = 0;
            }

            this.currentImage = this.images[nextIndex];
        }
    }
}
