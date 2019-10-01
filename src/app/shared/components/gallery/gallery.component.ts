import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

    constructor() { }

    @Input() screenshots: string[]

    slideOpts = {
        loop: false,
        autoplay: {
            delay :5000,
            stopOnLastSlide: true
        },
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: '.my-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="ion-padding-start ion-padding-end ${className}"> ${index + 1}</span>`;
            }
        }
    }

}
