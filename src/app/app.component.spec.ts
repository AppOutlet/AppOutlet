import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SettingsService } from './service/settings/settings.service';
import { NbThemeService } from '@nebular/theme';
import { WindowRef } from './util/window-ref';
import { Router } from '@angular/router';

describe('AppComponent', () => {
    let component: AppComponent;
    const mockTranslateService = { use: jest.fn() };
    const mockSettingsService = {
        getTheme: jest.fn(),
        getLastSynchronizationDate: jest.fn(),
    };
    mockSettingsService.getLastSynchronizationDate.mockReturnValue(
        Promise.resolve(new Date()),
    );
    const mockThemeService = { changeTheme: jest.fn() };
    const mockWindowRef = {
        nativeWindow: {
            navigator: {
                language: 'pt-BR',
            },
        },
    };
    const mockRouter = {
        navigate: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                { provide: TranslateService, useValue: mockTranslateService },
                { provide: SettingsService, useValue: mockSettingsService },
                { provide: NbThemeService, useValue: mockThemeService },
                { provide: WindowRef, useValue: mockWindowRef },
                { provide: Router, useValue: mockRouter },
            ],
            declarations: [AppComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should setup theme at start', (done) => {
        const currentTheme = 'cosmic';
        mockThemeService.changeTheme.mockClear();
        mockSettingsService.getTheme.mockReturnValue(
            Promise.resolve(currentTheme),
        );

        component.ngOnInit();

        setTimeout(() => {
            expect(mockThemeService.changeTheme.mock.calls.length).toBe(1);
            expect(mockThemeService.changeTheme.mock.calls[0][0]).toEqual(
                currentTheme,
            );
            done();
        }, 0);
    });

    it('should setup theme as default it there is not saved theme', (done) => {
        mockThemeService.changeTheme.mockClear();
        mockSettingsService.getTheme.mockReturnValue(Promise.resolve(null));

        component.ngOnInit();

        setTimeout(() => {
            expect(mockThemeService.changeTheme.mock.calls.length).toBe(1);
            expect(mockThemeService.changeTheme.mock.calls[0][0]).toEqual(
                'default',
            );
            done();
        }, 0);
    });

    it('should setup language at start', () => {
        expect(mockTranslateService.use.mock.calls.length).toBe(1);
        expect(mockTranslateService.use.mock.calls[0][0]).toEqual('pt-BR');
    });

    it('should open initial setup component if there is not last sychronization date', (done) => {
        mockSettingsService.getLastSynchronizationDate.mockReturnValue(
            Promise.resolve(null),
        );

        mockRouter.navigate.mockReturnValue(Promise.resolve());

        component.ngOnInit();

        setTimeout(() => {
            expect(mockRouter.navigate.mock.calls[0][0]).toEqual(['setup']);
            done();
        }, 0);
    });
});
