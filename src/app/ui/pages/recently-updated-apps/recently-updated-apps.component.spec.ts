import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyUpdatedAppsComponent } from './recently-updated-apps.component';
import { ApplicationService } from '../../../service/application/application.service';
import { ListModule } from '../../components/list/list.module';
import { TranslateModule } from '@ngx-translate/core';
import { Application } from '../../../model/application.model';

describe('RecentlyUpdatedAppsComponent', () => {
    const mockApps: Application[] = [{ id: '1', name: 'app' }];

    const mockApplicationService = {
        findByLastReleaseDate: (): Promise<Application[]> =>
            Promise.resolve(mockApps),
    };

    let component: RecentlyUpdatedAppsComponent;
    let fixture: ComponentFixture<RecentlyUpdatedAppsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListModule, TranslateModule.forRoot()],
            declarations: [RecentlyUpdatedAppsComponent],
            providers: [
                {
                    provide: ApplicationService,
                    useValue: mockApplicationService,
                },
            ],
        })
            .overrideComponent(RecentlyUpdatedAppsComponent, {
                set: { template: '' },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentlyUpdatedAppsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load apps at start', () => {
        expect(component.apps).toEqual(mockApps);
    });
});
