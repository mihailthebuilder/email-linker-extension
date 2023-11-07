import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css'
import Login from './PopupPages/Login'
import Register from './PopupPages/Register'

import { Page } from './enums'
import { useState } from 'react'
import { SetPageContext } from './Contexts'

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

  let rendered: React.ReactElement

  switch (page) {
    case Page.Login:
      rendered = <Login />
      break;
    case Page.Register:
      rendered = <Register />
  }

  return (
    <SetPageContext.Provider value={setPage}>
      {rendered}
    </SetPageContext.Provider>
  )
}



export default App
