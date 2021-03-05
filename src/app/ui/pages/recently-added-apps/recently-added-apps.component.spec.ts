import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedAppsComponent } from './recently-added-apps.component';

describe('RecentlyAddedAppsComponent', () => {
    let component: RecentlyAddedAppsComponent;
    let fixture: ComponentFixture<RecentlyAddedAppsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecentlyAddedAppsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RecentlyAddedAppsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
