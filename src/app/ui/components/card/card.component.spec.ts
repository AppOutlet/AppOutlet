import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCardModule } from '@nebular/theme';

import { CardComponent } from './card.component';
import DoneCallback = jest.DoneCallback;
import { CardDto } from './card.dto';
import { Router } from '@angular/router';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    const mockRouter = {
        navigate: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NbCardModule],
            declarations: [CardComponent],
            providers: [{ provide: Router, useValue: mockRouter }],
        })
            .overrideComponent(CardComponent, {
                set: { template: '' },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event when card is clicked', (done: DoneCallback) => {
        const app: CardDto = {
            id: '1',
            icon: 'icon',
            summary: 'summary',
            name: 'title',
            packageType: 'SNAP',
        };

        mockRouter.navigate.mockReturnValue(Promise.resolve());

        component.applicationClicked.subscribe((event) => {
            expect(event).toEqual(app);
            expect(mockRouter.navigate.mock.calls.length).toBe(1);
            done();
        });

        component.click(app).then();
    });

    it('should not emit event when app is null', async (done: DoneCallback) => {
        component.applicationClicked.subscribe(() => {
            fail();
        });

        await component.click(undefined);
        expect(mockRouter.navigate.mock.calls.length).toBe(0);

        done();
    });

    it('should get package icon by package type', () => {
        expect(component.getPackageIcon('SNAP')).toEqual(
            'assets/icon/snap.png',
        );

        expect(component.getPackageIcon('FLATPAK')).toEqual(
            'assets/icon/flatpak.png',
        );

        expect(component.getPackageIcon('APP_IMAGE')).toEqual(
            'assets/icon/appimage.png',
        );

        expect(component.getPackageIcon()).toEqual('');
    });
});
