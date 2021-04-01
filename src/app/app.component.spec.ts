import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from './service/settings/settings.service';
import { NbThemeService } from '@nebular/theme';

describe('AppComponent', () => {
    let component: AppComponent;
    const mockTranslateService = {};
    const mockSettingsService = { getTheme: jest.fn() };
    const mockThemeService = { changeTheme: jest.fn() };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                { provide: TranslateService, useValue: mockTranslateService },
                { provide: SettingsService, useValue: mockSettingsService },
                { provide: NbThemeService, useValue: mockThemeService },
            ],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should setup theme at start', () => {
        const currentTheme = 'cosmic';
        mockSettingsService.getTheme.mockReturnValue(
            Promise.resolve(currentTheme),
        );

        expect(mockThemeService.changeTheme.mock.calls.length).toBe(1);
    });
});
