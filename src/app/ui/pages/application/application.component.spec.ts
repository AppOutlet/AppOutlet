import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationComponent } from './application.component';
import { of } from 'rxjs';
import { Application } from '../../../model/application.model';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../service/application/application.service';
import { Location } from '@angular/common';
import { CoreService } from '../../../service/core/core.service';

describe('ApplicationComponent', () => {
    let component: ApplicationComponent;
    let fixture: ComponentFixture<ApplicationComponent>;

    const mockActivatedRoute = {
        paramMap: of({ get: (): string | null => 'category' }),
    };

    const mockApplicationService = {
        findByCategory: (): Promise<Application[]> => Promise.resolve([]),
    };

    const mockLocation = {};

    const mockCoreService = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApplicationComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                {
                    provide: ApplicationService,
                    useValue: mockApplicationService,
                },
                { provide: Location, useValue: mockLocation },
                { provide: CoreService, useValue: mockCoreService },
            ],
        })
            .overrideComponent(ApplicationComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
