import { Injectable } from '@angular/core'
import { AppRepository } from '../../repository/app/app.repository'
import { Category } from '../../model/category.model'
import { App } from '../../model/app.model'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private appRepository: AppRepository
    ) { }

    findByCategory(category: Category) {
        return this.appRepository.findByCategory(category)
    }

    findByName(query: string) {
        return this.appRepository.findByName(query)
    }

    findRecentlyUpdated() {
        return this.appRepository.findRecentlyUpdated()
    }

    findNew() {
        return this.appRepository.findNew()
    }

    findPopular() {
        return this.appRepository.findPopular()
    }

    notifyAppClicked(app: App) {
        return this.appRepository.notifyAppView(app._id)
    }

    selectApp(app: App) {
        localStorage.setItem('selectedApp', JSON.stringify(app))
    }

    getSelectedApp() : App{
        return JSON.parse(localStorage.getItem('selectedApp'))
    }

    install(app: App) {

    }
}
