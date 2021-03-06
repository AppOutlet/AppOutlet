import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedAppsComponent } from './recently-added-apps.component';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application/application.service';

describe('RecentlyAddedAppsComponent', () => {
    const mockApps: Application[] = [{ id: '1', name: 'app' }];

    const mockApplicationService = {
        findByCreationDate: (): Promise<Application[]> =>
            Promise.resolve(mockApps),
    };

    let component: RecentlyAddedAppsComponent;
    let fixture: ComponentFixture<RecentlyAddedAppsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecentlyAddedAppsComponent],
            providers: [
                {
                    provide: ApplicationService,
                    useValue: mockApplicationService,
                },
            ],
        })
            .overrideComponent(RecentlyAddedAppsComponent, {
                set: { template: '' },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentlyAddedAppsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
