import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css'
import Login from './PopupPages/Login'
import Register from './PopupPages/Register'

import { Page } from './enums'
import { useState } from 'react'
import { SetNotificationContext, SetPageContext } from './Contexts'
import User from './PopupPages/User'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EmailLinkerApp />
    </QueryClientProvider>
  )
}

function EmailLinkerApp() {
  const [page, setPage] = useState(Page.Login)
  const [notification, setNotification] = useState("")

  let rendered: React.ReactElement

  switch (page) {
    case Page.Register:
      rendered = <Register />
      break;
    case Page.User:
      rendered = <User />
      break;
    default:
      rendered = <Login />
  }

  return (
    <SetPageContext.Provider value={setPage}>
      <SetNotificationContext.Provider value={setNotification}>
        {rendered}
      </SetNotificationContext.Provider>
      {notification.length > 0 && <div>{notification}</div>}
    </SetPageContext.Provider>
  )
}



export default App
