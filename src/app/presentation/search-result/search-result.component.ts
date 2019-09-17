import { Component, OnInit } from '@angular/core';
import { App } from '../../core/model/app.model';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

    mockApp: App = {
        "categories": [
            "AudioVideoEditing",
            "Video",
            "AudioVideo"
        ],
        "screenshots": [
            "https://flathub.org/repo/screenshots/org.avidemux.Avidemux-stable/752x423/org.avidemux.Avidemux-2587f3d030864e34b7adcdebe32d4ba6.png",
            "https://flathub.org/repo/screenshots/org.avidemux.Avidemux-stable/752x423/org.avidemux.Avidemux-8eaf336c2841e40207ebc772d4ac3a90.png"
        ],
        "_id": "org.avidemux.Avidemux",
        "__v": 0,
        "bugtrackerUrl": "",
        "developer": "",
        "donationUrl": "",
        "flatpakAppId": "org.avidemux.Avidemux",
        "fullDescription": "<p>Avidemux is a free open-source program designed for multi-purpose video editing and processing, which can be used on almost all known operating systems and computer platforms.</p>\n",
        "homepage": "https://www.avidemux.org/",
        "icon": "https://gitcdn.xyz/repo/AppImage/appimage.github.io/master/database/Delir/icons/128x128/delir.png",
        "installScript": "",
        "lastUpdateDate": new Date(),
        "license": "GPL-2.0+",
        "name": "Avidemux Large App",
        "releaseDate": new Date(),
        "shortDescription": "no sp shortsad Multi-purpose video editing and processing software sdfdfsdi jfsiod fjioasdjfasiodjfosidjf",
        "store": "flathub",
        "version": "2.7.4"
    }

    constructor() { }

    ngOnInit() {
    }

}
