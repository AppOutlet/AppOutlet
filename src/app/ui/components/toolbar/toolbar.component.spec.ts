import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NbSearchService } from '@nebular/theme';
import { Observable, of } from 'rxjs';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    const mockLocation = {};
    const mockRouter = { events: of('') };
    const mockSearchService = {
        onSearchSubmit: (): Observable<unknown> => of(''),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolbarComponent],
            providers: [
                { provide: Location, useValue: mockLocation },
                { provide: Router, useValue: mockRouter },
                { provide: NbSearchService, useValue: mockSearchService },
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
