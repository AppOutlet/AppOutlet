import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { SectionComponent } from './section.component';
import { CardModule } from '../card/card.module';
import { SectionModule } from './section.module';
import { CardDto } from '../card/card.dto';

describe('SectionComponent', () => {
    let component: SectionComponent;
    let fixture: ComponentFixture<SectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, CardModule, TranslateModule.forRoot()],
            declarations: [SectionComponent],
        })
            .overrideComponent(SectionModule, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event when see more button is clicked', (done) => {
        component.seeMoreClicked.subscribe(() => {
            done();
        });

        component.onSeeMoreClicked();
    });

    it('should emit event when applications is clicked', (done) => {
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

        component.onAppClicked(app);
    });

    it('should not emit event when app is null', (done) => {
        component.applicationClicked.subscribe(() => {
            fail();
        });

        component.onAppClicked(undefined);

        done();
    });
});
