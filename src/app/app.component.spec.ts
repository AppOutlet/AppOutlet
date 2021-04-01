import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from './service/settings/settings.service';
import { NbThemeService } from '@nebular/theme';

describe('AppComponent', () => {
    const mockTranslateService = {};
    const mockSettingsService = {};
    const mockThemeService = {};

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
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
