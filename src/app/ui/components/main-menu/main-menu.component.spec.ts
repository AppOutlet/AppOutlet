import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

describe('MainMenuComponent', () => {
    let component: MainMenuComponent;
    let fixture: ComponentFixture<MainMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainMenuComponent],
            providers: [
                {
                    provide: TranslateService,
                    useValue: {
                        get: (key: string): Observable<string> => of(key),
                    },
                },
            ],
        })
            .overrideComponent(MainMenuComponent, {
                set: {
                    template: '',
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should setup menus', async () => {
        await component.setupMenuItems();
        expect(component.items.length).toBe(11);
    });
});
