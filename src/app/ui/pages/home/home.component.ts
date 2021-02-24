import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    apps = [
        {
            id: '1',
            title: 'Application title 1',
            summary: 'Application description 1',
            icon:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDN5iq5dod1mudrfsfxo6XGP51qtHQ-9xsdQ&usqp=CAU',
        },
        {
            id: '1',
            title: 'Application title 1',
            summary: 'Application description 1',
            icon:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDN5iq5dod1mudrfsfxo6XGP51qtHQ-9xsdQ&usqp=CAU',
        },
        {
            id: '1',
            title: 'Application title 1',
            summary: 'Application description 1asdasdasda',
            icon:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDN5iq5dod1mudrfsfxo6XGP51qtHQ-9xsdQ&usqp=CAU',
        },
        {
            id: '1',
            title: 'Application title 1',
            summary: 'Application description 1',
            icon:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDN5iq5dod1mudrfsfxo6XGP51qtHQ-9xsdQ&usqp=CAU',
        },
    ];
}
