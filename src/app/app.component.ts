import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private translateService: TranslateService) {
        this.setupTranslation();
    }

    private setupTranslation(): void {
        this.translateService.use(navigator.language);
    }
}
