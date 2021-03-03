import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application/application.service';

const mockedApps: Application[] = [{ id: '1', name: 'sample app' }];

const mockApplicationService = {
    getRecentlyAdded: (): Promise<Application[]> => Promise.resolve(mockedApps),
    getRecentlyUpdated: (): Promise<Application[]> =>
        Promise.resolve(mockedApps),
};

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [HomeComponent],
            providers: [
                {
                    provide: ApplicationService,
                    useValue: mockApplicationService,
                },
            ],
        })
            .overrideComponent(HomeComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load applications at start', async () => {
        expect(component.recentlyAddedApps).toBe(mockedApps);
        expect(component.recentlyUpdatedApps).toBe(mockedApps);
    });
});
