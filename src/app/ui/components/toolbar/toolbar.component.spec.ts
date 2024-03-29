import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { NbSearchService } from '@nebular/theme';
import { Observable, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    const mockLocation = {
        back: jest.fn(),
    };

    const mockRouter = { events: new Subject(), navigate: jest.fn() };

    const mockSearchService = {
        onSearchSubmit: (): Observable<unknown> => of(''),
    };

    const mockTranslateService = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolbarComponent],
            providers: [
                { provide: Location, useValue: mockLocation },
                { provide: Router, useValue: mockRouter },
                { provide: NbSearchService, useValue: mockSearchService },
                { provide: TranslateService, useValue: mockTranslateService },
            ],
        })
            .overrideComponent(ToolbarComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockRouter.events = new Subject();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show back button when navigate to any non root route', () => {
        const event = new NavigationEnd(1, '/application', '');

        mockRouter.events.next('');
        mockRouter.events.next(event);

        expect(component.shouldShowBackButton).toBeTruthy();
    });

    it('should navigate back', () => {
        component.goBack();

        expect(mockLocation.back.mock.calls.length).toBe(1);
    });
});
