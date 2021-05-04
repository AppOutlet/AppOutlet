import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatpakInstalledComponent } from './flatpak-installed.component';

describe('FlatpakInstalledComponent', () => {
    let component: FlatpakInstalledComponent;
    let fixture: ComponentFixture<FlatpakInstalledComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FlatpakInstalledComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FlatpakInstalledComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
