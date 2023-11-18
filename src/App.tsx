import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
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
      <Layout />
    </QueryClientProvider>
  )
}

const RouteToPage: { [key in Page]: React.ReactElement } = {
  [Page.Register]: <Register />,
  [Page.Login]: <Login />,
  [Page.User]: <User />,
  [Page.Loading]: <Loading />,
};


function Layout() {
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
    <main className="px-7 py-5 bg-cyan-950 text-[1.25rem] text-sky-50">
      <AppContext.Provider value={{ appState, setAppState }}>
        {RouteToPage[appState.page]}
        <div className="text-sm">
          Confused about something? Check out the <a className="text-blue-300" href="https://lnku.us/r/KACJKJDp">Chrome Web Store listing</a>.
        </div>
        {appState.notification.length > 0 && <div>{appState.notification}</div>}
      </ AppContext.Provider>
    </main>
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
