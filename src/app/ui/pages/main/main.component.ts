import { Component, OnInit } from '@angular/core';
import { SynchronizationService } from '../../../service/synchronization/synchronization.service';
import { ElectronService } from 'ngx-electron';
import * as InterfaceChannel from '../../../../../core/interface/InterfaceChannel';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    shouldShowSynchronizationMessage = true;
    isSynchronizationRunning = false;

    constructor(
        private synchronizationService: SynchronizationService,
        private electronService: ElectronService,
    ) {}

    ngOnInit(): void {
        this.listenToSynchronizationUpdates();
        this.getCurrentSynchronizationStatus();
    }

    private getCurrentSynchronizationStatus(): void {
        this.synchronizationService
            .getCurrentSynchronizationStatus()
            .then((status) => {
                debugger;
                this.isSynchronizationRunning = status;
            });
    }

    private listenToSynchronizationUpdates(): void {
        this.electronService.ipcRenderer.addListener(
            InterfaceChannel.synchronization.isRunning,
            (event, args) => {
                debugger;
                console.log(args, event);
            },
        );
    }

    closeSynchronizationMessage(): void {
        this.shouldShowSynchronizationMessage = false;
    }
}
