import { createContext } from 'react';
import { Page } from './enums'

export const SetPageContext = createContext((_: Page) => { });
