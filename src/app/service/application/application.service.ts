import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';
import { CoreService } from '../core/core.service';
import * as Channel from '../../../../core/interface/InterfaceChannel';
import { SearchParametersModel } from '../../model/search-parameters.model';

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
}
