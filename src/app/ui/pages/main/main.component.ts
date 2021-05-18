import { Component, OnInit } from '@angular/core';
import { SynchronizationService } from '../../../service/synchronization/synchronization.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    shouldShowSynchronizationMessage = true;
    isSynchronizationRunning = false;

    constructor(private synchronizationService: SynchronizationService) {}

    ngOnInit(): void {
        this.getCurrentSynchronizationStatus();
    }

    private getCurrentSynchronizationStatus(): void {
        this.synchronizationService
            .getCurrentSynchronizationStatus()
            .then((status) => {
                this.isSynchronizationRunning = status;
            });
    }

    closeSynchronizationMessage(): void {
        this.shouldShowSynchronizationMessage = false;
    }
}
