import { createContext, useContext } from 'react';
import { Page } from './enums'

export const SetPageContext = createContext((_: Page) => { });

export function useNavigation() {
    return useContext(SetPageContext)
}

export const SetNotificationContext = createContext((_: string) => { });

export function useNotification() {
    return useContext(SetNotificationContext)
}