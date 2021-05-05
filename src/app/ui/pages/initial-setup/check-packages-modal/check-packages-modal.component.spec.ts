import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPackagesModalComponent } from './check-packages-modal.component';

describe('CheckPackagesModalComponent', () => {
    let component: CheckPackagesModalComponent;
    let fixture: ComponentFixture<CheckPackagesModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckPackagesModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckPackagesModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
