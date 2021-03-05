import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyUpdatedAppsComponent } from './recently-updated-apps.component';

describe('RecentlyUpdatedAppsComponent', () => {
    let component: RecentlyUpdatedAppsComponent;
    let fixture: ComponentFixture<RecentlyUpdatedAppsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecentlyUpdatedAppsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentlyUpdatedAppsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
