import { App } from './app.model'

export interface Section {
    title: string
    apps: App[]
    state: SectionState
}

export enum SectionState {
    LOADING = 'loading',
    ERROR = 'error',
    LOADED = 'loaded'
}
