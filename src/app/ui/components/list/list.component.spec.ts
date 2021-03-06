import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { CardDto } from '../card/card.dto';
import { WindowRef } from '../../../util/window-ref';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    const mockWindowRef = {
        nativeWindow: {
            innerHeight: 100,
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListComponent],
            providers: [{ provide: WindowRef, useValue: mockWindowRef }],
        })
            .overrideComponent(ListComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event when application is clicked', (done) => {
        const mockApp: CardDto = {
            id: '1',
            name: 'mock app',
        };

        component.applicationClicked.subscribe((value) => {
            expect(value).toEqual(mockApp);
            done();
        });

        component.onAppClicked(mockApp);
    });

    it('should emit event when some app is clicked', (done) => {
        const mockApp: CardDto = { id: '1' };

        component.applicationClicked.subscribe((app) => {
            expect(app).toEqual(mockApp);
            done();
        });

        component.onAppClicked(mockApp);
    });

    it('should emit event when scroll reaches at bottom', (done) => {
        component.nextPageNeeded.subscribe((currentPage) => {
            expect(currentPage).toBe(2);
            done();
        });

        component.onListScroll({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            target: {
                scrollingElement: {
                    scrollHeight: 200,
                    scrollTop: 99,
                },
            },
        });
    });

    it('should not emit event when scroll not reached at bottom', () => {
        component.nextPageNeeded.subscribe(() => {
            fail('should not emit event');
        });

        component.onListScroll({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            target: {
                scrollingElement: {
                    scrollHeight: 200,
                    scrollTop: 9,
                },
            },
        });
    });

    it('should not emit event when scroll target is null', () => {
        component.nextPageNeeded.subscribe(() => {
            fail('should not emit event');
        });

        component.onListScroll({
            target: null,
        });
    });
});
