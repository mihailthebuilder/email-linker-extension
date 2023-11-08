import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css'
import Login from './PopupPages/Login'
import Register from './PopupPages/Register'

import { Page } from './enums'
import { useState, useEffect } from 'react'
import { SetNotificationContext, SetPageContext } from './Contexts'
import User from './PopupPages/User'
import Loading from './PopupPages/Loading'

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
  const [page, setPage] = useState(Page.Loading)
  const [notification, setNotification] = useState("")

  useEffect(() => {
    async function getAuthenticationTokenFromBrowser() {

      const result = await chrome.storage.local.get(["authenticationToken"])
      const token = result["authenticationToken"] as string

      if (typeof token !== "string") {
        setPage(Page.Login)
        return
      }

      if (token.length === 0) {
        setPage(Page.Login)
        return
      }

      setPage(Page.User)
    }

    getAuthenticationTokenFromBrowser()
  }, [])


  return (
    <SetPageContext.Provider value={setPage}>
      <SetNotificationContext.Provider value={setNotification}>
        {RouteToPage[page]}
      </SetNotificationContext.Provider>
      {notification.length > 0 && <div>{notification}</div>}
    </SetPageContext.Provider>
  )
}



export default App
