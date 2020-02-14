import { Component, OnInit } from '@angular/core';
import { Section, SectionState } from '../../core/model/section.model';
import { HomePresenter } from './home.presenter';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    loading = false;

    recentlyUpdatedSection: Section = {
        title: 'PAGES.HOME.RECENTLY_UPDATED',
        apps: [],
        state: SectionState.LOADED
    };

    newSection: Section = {
        title: 'PAGES.HOME.NEW_RELEASES',
        apps: [],
        state: SectionState.LOADED
    };

    popularSection: Section = {
        title: 'PAGES.HOME.POPULAR',
        apps: [],
        state: SectionState.LOADED
    };

    constructor(
        private presenter: HomePresenter
    ) { }

    ionViewDidEnter() {
        this.presenter.init(this);
    }

    reloadRecentlyUpdated() {
        this.presenter.findRecentlyUpdated();
    }

    reloadPopular() {
        this.presenter.findPopular();
    }

    reloadNew() {
        this.presenter.findNew();
    }
}
