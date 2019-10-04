import { Injectable } from '@angular/core'
import { AppRepository } from '../../repository/app/app.repository'
import { Category } from '../../model/category.model'
import { App } from '../../model/app.model'
import { ProcessService } from '../proccess/process.service'
import { AppState } from '../../model/app-state.model'
import { ProcessType } from '../../model/process'
import { ElectronService } from '../electron/electron.service'
import { AlertController } from '@ionic/angular'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private appRepository: AppRepository,
        private processService: ProcessService,
        private electronService: ElectronService,
        private alertController: AlertController
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
            default:
                return Promise.resolve(false)
        }
    }

    private verifyIfFlatpakIsInstalled(app: App) {
        return this.electronService.execCommand(`flatpak list | grep ${app.flatpakAppId}`).then((output: string) => {
            return output.length > 0
        }).catch(err => {
            return false
        })
    }
    private verifyIfSnapIsInstalled(app: App) {
        return this.electronService.execCommand(`snap list | grep ${app.packageName}`).then((output: string) => {
            
            return output.length > 0
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
            default:
                return Promise.reject(`${app.type} ainda não suportado`)
        }
    }

    runFlatpak(app: App) {
        this.electronService.childProcess.spawn('flatpak', ['run', app._id], { detached: true })
    }
    runSnap(app: App) {
        this.presentNOUrlAlert(`snap run ${app.packageName}`)//teste
        this.electronService.childProcess.spawn('snap', ['run', app.packageName], { detached: true })
        this.electronService.execCommand(`snap run ${app.packageName}`).then((output: string) => {
            this.presentNOUrlAlert(output)//teste
        })
    }
    
    uninstall(app: App) {
        this.processService.uninstall(app)
    }
    async presentNOUrlAlert(output: string) {

        const alert = await this.alertController.create({
            header: '...',
            message: `${output}`,
            buttons: [{
                text: 'OK'
            }]
        })

        await alert.present()
    }
}
