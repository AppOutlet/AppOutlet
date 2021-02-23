import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { MainMenuModule } from '../../components/main-menu/main-menu.module';
import { NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MainMenuModule,
                NbLayoutModule,
                NbEvaIconsModule,
                NbSidebarModule.forRoot(),
                RouterModule.forRoot([]),
                NbThemeModule.forRoot(),
                TranslateModule.forRoot(),
            ],
            declarations: [MainComponent],
            providers: [{ provide: APP_BASE_HREF, useValue: './' }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
