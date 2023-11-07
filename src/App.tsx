import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css'
import Login from './PopupPages/Login'
import Register from './PopupPages/Register'

import { Page } from './shared/types'

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
      rendered = <Login setPage={setPage} />
      break;
    case Page.Register:
      rendered = <Register setPage={setPage} />
  }

  return rendered
}



export default App
