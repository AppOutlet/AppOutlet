import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCardModule } from '@nebular/theme';

import { CardComponent } from './card.component';
import DoneCallback = jest.DoneCallback;
import { CardDto } from './card.dto';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NbCardModule],
            declarations: [CardComponent],
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event when card is clicked', (done: DoneCallback) => {
        const app: CardDto = {
            id: '1',
            icon: 'icon',
            summary: 'summary',
            title: 'title',
        };

        component.applicationClicked.subscribe((event) => {
            expect(event).toEqual(app);
            done();
        });

        component.click(app);
    });

    it('should not emit event when app is null', (done: DoneCallback) => {
        component.applicationClicked.subscribe(() => {
            fail();
        });

        component.click(undefined);

        done();
    });
});
