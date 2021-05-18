import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    shouldShowSynchronizationMessage = true;

    closeSynchronizationMessage(): void {
        this.shouldShowSynchronizationMessage = false;
    }
}
