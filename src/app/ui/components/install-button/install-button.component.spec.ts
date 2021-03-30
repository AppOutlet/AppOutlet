import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallButtonComponent } from './install-button.component';
import { ApplicationStatus } from '../../../model/application-status';

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

    it('should setup button for application not installed status', () => {
        component.applicationStatus = ApplicationStatus.NOT_INSTALLED;
        component.ngOnChanges(undefined);
        expect(component.buttonStatus).toEqual('success');
        expect(component.buttonText).toEqual('PAGES.APP_DETAIL.INSTALL');
        expect(component.buttonIcon).toEqual('download-outline');
        expect(component.buttonEnabled).toBeTruthy();
        expect(component.shouldShowButtonIcon).toBeTruthy();
        expect(component.loading).toBeFalsy();
    });

    it('should setup button for application installed status', () => {
        component.applicationStatus = ApplicationStatus.INSTALLED;
        component.ngOnChanges(undefined);
        expect(component.buttonStatus).toEqual('danger');
        expect(component.buttonText).toEqual('PAGES.APP_DETAIL.UNINSTALL');
        expect(component.buttonIcon).toEqual('trash-outline');
        expect(component.buttonEnabled).toBeTruthy();
        expect(component.shouldShowButtonIcon).toBeTruthy();
        expect(component.loading).toBeFalsy();
    });

    it('should setup button for application installing status', () => {
        component.applicationStatus = ApplicationStatus.INSTALLING;
        component.ngOnChanges(undefined);
        expect(component.buttonStatus).toEqual('basic');
        expect(component.buttonText).toEqual('PAGES.APP_DETAIL.INSTALLING');
        expect(component.buttonEnabled).toBeFalsy();
        expect(component.shouldShowButtonIcon).toBeFalsy();
        expect(component.loading).toBeTruthy();
    });

    it('should setup button for application invalid status', () => {
        component.applicationStatus = undefined;
        component.ngOnChanges(undefined);
        expect(component.buttonStatus).toEqual('basic');
        expect(component.buttonText).toEqual('');
    });

    it('should emit install clicked event', () => {
        component.applicationStatus = ApplicationStatus.NOT_INSTALLED;
        component.installClicked.subscribe((arg) => {
            expect(arg).toBeUndefined();
        });
        component.uninstallClicked.subscribe(() => {
            fail('should not emit this event');
        });
        component.onClick();
    });

    it('should emit uninstall clicked event', () => {
        component.applicationStatus = ApplicationStatus.INSTALLED;
        component.uninstallClicked.subscribe((arg) => {
            expect(arg).toBeUndefined();
        });
        component.installClicked.subscribe(() => {
            fail('should not emit this event');
        });
        component.onClick();
    });
});
