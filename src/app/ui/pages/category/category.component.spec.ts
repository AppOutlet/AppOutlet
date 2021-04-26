import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApplicationService } from '../../../service/application/application.service';
import { Application } from '../../../model/application.model';
import { ApplicationResponse } from '../../../model/application-response.model';

describe('CategoryComponent', () => {
    let component: CategoryComponent;
    let fixture: ComponentFixture<CategoryComponent>;

    const mockApps: Application[] = [{ id: '1', name: 'apps' }];
    const mockAppResponse: ApplicationResponse = {
        apps: mockApps,
        count: mockApps.length,
        numberOfPages: 1,
    };

    const mockApplicationService = {
        findByCategory: (): Promise<ApplicationResponse> =>
            Promise.resolve(mockAppResponse),
    };

    const mockActivatedRoute = {
        paramMap: of({ get: (): string | null => 'category' }),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute,
                },
                {
                    provide: ApplicationService,
                    useValue: mockApplicationService,
                },
            ],
        })
            .overrideComponent(CategoryComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load apps at component start', () => {
        expect(component.apps).toEqual(mockApps);
    });

    it('should accumulate apps', (done) => {
        component.loadApps(1);
        setTimeout(() => {
            expect(component.apps).toEqual([...mockApps, ...mockApps]);
            done();
        }, 0);
    });

    it('should reset list', (done) => {
        component.loadApps(0);

        setTimeout(() => {
            expect(component.apps).toEqual(mockApps);
            done();
        }, 0);
    });

    it('should not load apps if category is null', () => {
        mockActivatedRoute.paramMap = of({ get: (): string | null => null });

        const categoryComponent = new CategoryComponent(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockActivatedRoute,
            mockApplicationService,
        );

        categoryComponent.ngOnInit();

        expect(categoryComponent.apps).toEqual([]);
    });
});
