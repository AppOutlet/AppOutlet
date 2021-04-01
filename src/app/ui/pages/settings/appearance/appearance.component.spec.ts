import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceComponent } from './appearance.component';
import { NbThemeService } from '@nebular/theme';
import { SettingsService } from '../../../../service/settings/settings.service';

describe('AppearanceComponent', () => {
    let component: AppearanceComponent;
    let fixture: ComponentFixture<AppearanceComponent>;

    const mockThemeService = { changeTheme: jest.fn() };
    const mockSettingsService = { setTheme: jest.fn(), getTheme: jest.fn() };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppearanceComponent],
            providers: [
                { provide: NbThemeService, useValue: mockThemeService },
                { provide: SettingsService, useValue: mockSettingsService },
            ],
        })
            .overrideComponent(AppearanceComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppearanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // tslint:disable-next-line:quotemark
    it("should show 'default' as default theme", () => {
        mockSettingsService.getTheme.mockReturnValue(Promise.resolve(null));
        component.ngOnInit();
        setTimeout(() => {
            expect(component.selectedTheme).toEqual('default');
        }, 0);
    });

    it('should show saved theme', () => {
        const savedTheme = 'cosmic';
        mockSettingsService.getTheme.mockReturnValue(
            Promise.resolve(savedTheme),
        );
        component.ngOnInit();
        setTimeout(() => {
            expect(component.selectedTheme).toEqual(savedTheme);
        }, 0);
    });

    it('should set theme when is successfully saved', async () => {
        mockSettingsService.setTheme.mockReturnValue(Promise.resolve());
        const selectedTheme = 'cosmic';
        await component.onThemeChange(selectedTheme);

        expect(mockSettingsService.setTheme.mock.calls.length).toBe(1);
        expect(mockSettingsService.setTheme.mock.calls[0][0]).toBe(
            selectedTheme,
        );
        expect(mockThemeService.changeTheme.mock.calls.length).toBe(1);
        expect(mockThemeService.changeTheme.mock.calls[0][0]).toBe(
            selectedTheme,
        );
    });
});
