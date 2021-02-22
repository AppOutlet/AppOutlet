import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
    items: NbMenuItem[] = [
        {
            title: 'Office',
            icon: 'layers-outline',
        },
        {
            title: 'Internet and Communication',
            icon: 'globe-2-outline',
        },
        {
            title: 'Audio',
            icon: { icon: 'music-outline' },
        },
        {
            title: 'Video',
            icon: 'video-outline',
        },
        {
            title: 'Games',
            icon: 'cube-outline',
        },
        {
            title: 'Development',
            icon: 'code-outline',
        },
        {
            title: 'Finance',
            icon: 'bar-chart-outline',
        },
        {
            title: 'Graphics',
            icon: 'image-outline',
        },
        {
            title: 'Science and Education',
            icon: 'book-outline',
        },
        {
            title: 'Utility and Productivity',
            icon: 'bulb-outline',
        },
        {
            title: 'Miscellaneous',
            icon: 'grid-outline',
        },
    ];
}
