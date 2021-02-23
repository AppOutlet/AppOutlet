import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoryComponent', () => {
    let component: CategoryComponent;
    let fixture: ComponentFixture<CategoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({ get: (): string => '' }) },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
