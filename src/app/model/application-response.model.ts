import { Application } from './application.model';

export interface ApplicationResponse {
    apps: Application[];
    numberOfPages: number;
    count: number;
}
