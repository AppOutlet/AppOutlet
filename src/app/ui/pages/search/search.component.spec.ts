import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from './search.component';
import { ApplicationService } from '../../../service/application/application.service';
import { Application } from '../../../model/application.model';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    const mockActivatedRoute = {
        paramMap: new Subject(),
    };

    const mockApplicationService = {
        findByTerm: jest.fn(),
    };

    const mockApps: Application[] = [{ id: '1', name: 'apps' }];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                {
                    provide: ApplicationService,
                    useValue: mockApplicationService,
                },
            ],
        })
            .overrideComponent(SearchComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load applications at start', (done) => {
        const mockSearchTerm = 'Search term';

        mockApplicationService.findByTerm.mockReturnValue(
            Promise.resolve(mockApps),
        );

        mockActivatedRoute.paramMap.next({ get: () => mockSearchTerm });

        expect(component.searchTerm).toEqual(mockSearchTerm);
        expect(component.apps).toEqual([]);
        expect(component.loading).toBeTruthy();
        expect(mockApplicationService.findByTerm.mock.calls.length).toBe(1);
        expect(mockApplicationService.findByTerm.mock.calls[0][0]).toEqual({
            page: 0,
            searchTerm: mockSearchTerm,
        });

        setTimeout(() => {
            expect(component.apps).toEqual(mockApps);
            expect(component.loading).toBeFalsy();
            done();
        }, 0);
    });

    it('should not load apps if search term is undefined', () => {
        mockActivatedRoute.paramMap.next({ get: () => undefined });

        expect(component.searchTerm).toBeUndefined();
        expect(component.apps).toEqual([]);
        expect(component.loading).toBeFalsy();
        expect(mockApplicationService.findByTerm.mock.calls.length).toBe(0);
    });
});
