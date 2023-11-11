import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css'
import Login from './PopupPages/Login'
import Register from './PopupPages/Register'

import { Page } from './enums'
import { useState, useEffect } from 'react'
import { AppContext } from './Contexts'
import User from './PopupPages/User'
import { jwtDecode } from "jwt-decode"
import Loading from './PopupPages/Loading'

import { AppState } from './Contexts'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EmailLinkerApp />
    </QueryClientProvider>
  )
}

const RouteToPage: { [key in Page]: React.ReactElement } = {
  [Page.Register]: <Register />,
  [Page.Login]: <Login />,
  [Page.User]: <User />,
  [Page.Loading]: <Loading />,
};


function EmailLinkerApp() {
  const [appState, setAppState] = useState(new AppState())

  useEffect(() => {
    async function getAuthenticationTokenFromBrowser() {
      const result = await chrome.storage.local.get(["authenticationToken"])
      const token = result["authenticationToken"]

      if (typeof token !== "string" || !tokenIsValid(token)) {
        setAppState(appState.withPage(Page.Login).createNewState())
        return
      }

      setAppState(appState.withPage(Page.User).withAuthenticationToken(token).createNewState())
    }

    getAuthenticationTokenFromBrowser()
  }, [])

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {RouteToPage[appState.page]}
      {appState.notification.length > 0 && <div>{appState.notification}</div>}
    </ AppContext.Provider>
  )
}

function tokenIsValid(token: string): boolean {
  if (token.length === 0) {
    return false
  }

  const decodedToken = jwtDecode(token)
  if (!decodedToken.exp) {
    return false
  }

  if (Date.now() > decodedToken.exp * 1000) {
    return false
  }

  return true
}

export default App
