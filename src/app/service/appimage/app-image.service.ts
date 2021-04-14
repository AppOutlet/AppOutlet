import { Injectable } from '@angular/core';
import { Application } from '../../model/application.model';

@Injectable({
    providedIn: 'root',
})
export class AppImageService {
    getAppImageInformation(application: Application): Promise<Application> {
        return Promise.reject(application);
    }
}
