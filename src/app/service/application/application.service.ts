import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import { CoreService } from '../core/core.service';
import * as Channel from '../../../../core/interface/InterfaceChannel';
import { SearchParametersModel } from '../../model/search-parameters.model';
import { ProcessService } from '../process/process.service';
import { ApplicationStatus } from '../../model/application-status';
import { Observable } from 'rxjs';
import { ProcessInfo } from '../process/process-info';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(
        private coreService: CoreService,
        private processService: ProcessService,
    ) {}

    getRecentlyAdded(): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.getRecentlyAdded,
        );
    }

    getRecentlyUpdated(): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.getRecentlyUpdated,
        );
    }

    findByCreationDate(
        searchParameters: SearchParametersModel,
    ): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.findByCreationDate,
            searchParameters,
        );
    }

    findByLastReleaseDate(
        searchParameters: SearchParametersModel,
    ): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.findByLastReleaseDate,
            searchParameters,
        );
    }

    findByCategory(
        searchParameters: SearchParametersModel,
    ): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.findByCategory,
            searchParameters,
        );
    }

    findById(id: string): Promise<Application> {
        return this.coreService.invoke<Application>(
            Channel.application.findById,
            id,
        );
    }

    findByTerm(
        searchParameters: SearchParametersModel,
    ): Promise<Application[]> {
        return this.coreService.invoke<Application[]>(
            Channel.application.searchByTerm,
            searchParameters,
        );
    }

    install(application: Application): Promise<void> {
        return this.processService.installApplication(application);
    }

    getApplicationStatus(application: Application): Promise<ApplicationStatus> {
        return this.processService.getApplicationStatus(application);
    }

    getApplicationListener(application: Application): Observable<ProcessInfo> {
        return this.processService.getProcessListener(application.id);
    }
}
