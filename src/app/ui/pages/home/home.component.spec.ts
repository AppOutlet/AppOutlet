import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application/application.service';
import { Router } from '@angular/router';

const mockedApps: Application[] = [{ id: '1', name: 'sample app' }];

const mockApplicationService = {
    getRecentlyAdded: (): Promise<Application[]> => Promise.resolve(mockedApps),
    getRecentlyUpdated: (): Promise<Application[]> =>
        Promise.resolve(mockedApps),
};

const mockRouter = {
    navigate: jest.fn(),
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
                {
                    provide: Router,
                    useValue: mockRouter,
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load applications at start', async () => {
        expect(component.recentlyAddedApps).toBe(mockedApps);
        expect(component.recentlyUpdatedApps).toBe(mockedApps);
    });

    it('should navigate to recently added apps', async () => {
        await component.showRecentlyAddedApps();

        expect(mockRouter.navigate.mock.calls.length).toBe(1);
        expect(mockRouter.navigate.mock.calls[0][0]).toEqual([
            'recently-added',
        ]);
    });

    it('should navigate to recently updated apps', async () => {
        await component.showRecentlyUpdatedApps();

        expect(mockRouter.navigate.mock.calls.length).toBe(1);
        expect(mockRouter.navigate.mock.calls[0][0]).toEqual([
            'recently-updated',
        ]);
    });
});
