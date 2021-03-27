import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallButtonComponent } from './install-button.component';

describe('InstallButtonComponent', () => {
    let component: InstallButtonComponent;
    let fixture: ComponentFixture<InstallButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InstallButtonComponent],
        })
            .overrideComponent(InstallButtonComponent, {
                set: { template: '' },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InstallButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
