import { createContext, useContext } from 'react';
import { Page } from './enums'


export function useAppState() {
    return useContext(AppContext)
}

export class AppState {
    page: Page;
    notification: string;
    authenticationToken: string;

    constructor() {
        this.page = Page.Loading;
        this.notification = "";
        this.authenticationToken = "";
    }

    withPage(page: Page) {
        this.page = page
        return this
    }

    withNotification(notification: string) {
        this.notification = notification
        return this
    }

    withAuthenticationToken(token: string) {
        this.authenticationToken = token
        return this
    }

    createNewState() {
        const state = new AppState()
        return state.withPage(this.page).withNotification(this.notification).withAuthenticationToken(this.authenticationToken)
    }
}

export const AppContext = createContext({ appState: new AppState(), setAppState: (_: AppState) => { } });