import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../service/application/application.service';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Application } from '../../../model/application.model';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
    application?: Application;

    constructor(
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private location: Location,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap
            .pipe(map((parameters) => parameters.get('id')))
            .subscribe((id) => this.loadApplication(id));
    }

    private loadApplication(id: string | null): void {
        if (!id) {
            return;
        }

        this.applicationService.findById(id).then((app) => {
            this.application = app;
        });
    }

    goBack(): void {
        this.location.back();
    }
}
