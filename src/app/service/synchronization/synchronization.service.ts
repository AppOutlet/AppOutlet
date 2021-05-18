import { Injectable } from '@angular/core';
import { CoreService } from '../core/core.service';
import * as InterfaceChannel from '../../../../core/interface/InterfaceChannel';

@Injectable()
export class SynchronizationService {
    constructor(private coreService: CoreService) {}

    getCurrentSynchronizationStatus(): Promise<boolean> {
        return this.coreService.invoke<boolean>(
            InterfaceChannel.synchronization.isRunningSync,
        );
    }
}
