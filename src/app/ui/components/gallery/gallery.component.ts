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
    currentImageIndex?: number;
    private intervalId?: number;
    private shouldChangeImage = true;

    constructor(private window: WindowRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.intervalId) {
            this.window.nativeWindow.clearInterval(this.intervalId);
        }

        if (!changes.images.currentValue) {
            return;
        }

        this.currentImage = changes.images.currentValue[0];
        this.currentImageIndex = 0;

        this.intervalId = this.window.nativeWindow.setInterval(
            this.handleImages.bind(this),
            this.TIMER,
        );
    }

    // Visible for testing purposes
    handleImages(): void {
        if (!this.shouldChangeImage || !this.images || !this.currentImage) {
            return;
        }

        let nextIndex = this.images.indexOf(this.currentImage) + 1;

        if (nextIndex === this.images.length) {
            nextIndex = 0;
        }

        this.currentImage = this.images[nextIndex];
        this.currentImageIndex = nextIndex;
    }

    selectImage(imageIndex: number): void {
        this.currentImage = this.images?.[imageIndex];
        this.currentImageIndex = imageIndex;
        this.shouldChangeImage = false;
    }
}
