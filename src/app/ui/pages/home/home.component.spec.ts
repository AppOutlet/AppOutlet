import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbButtonModule } from '@nebular/theme';

import { HomeComponent } from './home.component';
import { SectionModule } from '../../components/section/section.module';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SectionModule, NbButtonModule],
            declarations: [HomeComponent],
        })
            .overrideComponent(HomeComponent, { set: { template: '' } })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
