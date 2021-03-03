import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import { CoreService } from '../core/core.service';
import * as Channel from '../../../../core/interface/InterfaceChannel';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(private coreService: CoreService) {}

    getRecentlyAdded(): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.getRecentlyAdded,
        );
    }
}
