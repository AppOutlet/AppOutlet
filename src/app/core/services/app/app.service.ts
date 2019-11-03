import { Injectable } from '@angular/core'
import { AppRepository } from '../../repository/app/app.repository'
import { Tag } from '../../model/tag.model'
import { App } from '../../model/app.model'
import { ProcessService } from '../proccess/process.service'
import { AppState } from '../../model/app-state.model'
import { ProcessType } from '../../model/process'
import { ElectronService } from '../electron/electron.service'
import { Category } from '../../model/category.model'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private appRepository: AppRepository,
        private processService: ProcessService,
        private electronService: ElectronService
    ) { }

    findByCategory(category: Category): Observable<App[]> {
        return this.appRepository.findByCategory(category)
    }

    findByTag(tag: Tag) {
        return this.appRepository.findByTag(tag)
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

    getSelectedApp(): App {
        return JSON.parse(localStorage.getItem('selectedApp'))
    }

    install(app: App) {
        this.processService.install(app)
    }

    getAppState(app: App): Promise<AppState> {
        let appState = this.verifyAppStateInProcessQueue(app)
        if (appState) {
            return Promise.resolve(appState)
        } else {
            return this.verifyIfAppIsInstalled(app).then(isInstalled => {
                if (isInstalled) {
                    return AppState.INSTALLED
                } else {
                    return AppState.NOT_INSTALLED
                }
            })
        }
    }

    private verifyIfAppIsInstalled(app: App): Promise<boolean> {
        switch (app.type) {
            case 'Flatpak':
                return this.verifyIfFlatpakIsInstalled(app)
            case 'Snap':
                return this.verifyIfSnapIsInstalled(app)
            case 'AppImage':
                    return this.verifyIfAppImageIsInstalled(app)
            default:
                return Promise.resolve(false)
        }
    }

    private verifyIfSnapIsInstalled(app: App) {
        return this.electronService.execCommand(`snap list | grep ${app.packageName}`).then((output: string) => {
            return output.length > 0
        }).catch(err => {
            return false
        })
    }

    private verifyIfFlatpakIsInstalled(app: App) {
        return this.electronService.execCommand(`flatpak list | grep ${app.flatpakAppId}`).then((output: string) => {
            return output.length > 0
        }).catch(err => {
            return false
        })
    }

    private verifyIfAppImageIsInstalled(app: App) {
        return this.electronService.execCommand(`if [ -f $HOME/.appoutlet/${app._id}.AppImage ]; then echo "Found"; else echo "Not Found"; fi`).then((output: string) => {
            return output.trim() == 'Found'
        }).catch(err => {
            return false
        })
    }

    private verifyAppStateInProcessQueue(app: App): AppState {
        let process = this.processService.processQueue.find(p => p.app._id == app._id)
        if (process != null) {
            if (process.processType == ProcessType.INSTALL) {
                return AppState.INSTALLING
            } else {
                return AppState.REMOVING
            }
        } else {
            return null
        }
    }

    run(app: App) {
        switch (app.type) {
            case 'Flatpak':
                return this.runFlatpak(app)
            case 'Snap':
                return this.runSnap(app)
            case 'AppImage':
                return this.runAppImage(app)
            default:
                return Promise.reject(`${app.type} not supported yet`)
        }
    }

    runFlatpak(app: App) {
        this.electronService.childProcess.spawn('flatpak', ['run', app._id], { detached: true })
    }

    runSnap(app: App) {
        this.electronService.childProcess.spawn(app.packageName, [], { detached: true })
    }

    runAppImage(app: App) {
        this.electronService.execCommand(`$HOME/.appoutlet/${app._id}.AppImage`).then()
    }

    uninstall(app: App) {
        this.processService.uninstall(app)
    }
}
