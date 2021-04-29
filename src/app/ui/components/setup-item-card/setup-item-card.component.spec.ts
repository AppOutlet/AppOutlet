import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupItemCardComponent } from './setup-item-card.component';

describe('SetupItemCardComponent', () => {
    let component: SetupItemCardComponent;
    let fixture: ComponentFixture<SetupItemCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SetupItemCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SetupItemCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
