import { ChangeEvent, FormEvent, useState } from 'react'
import { Page } from '../enums'

import {
  useMutation,
} from 'react-query'
import { useAppState } from '../Contexts'
import TextInput from '../Components/TextInput/TextInput'
import Button from '../Components/Button/Button'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { appState, setAppState } = useAppState()

  const mutation = useMutation({
    mutationFn: () => { return fetchAuthenticationToken(email, password) },
    onSuccess: async (response) => {
      if (response.status === 400) {
        let body = await response.text()
        body = body.replace(/"/g, "")
        setAppState(appState.withNotification(body).createNewState())
        return
      }

      if (!response.ok) {
        setAppState(appState.withNotification("Something went wrong when calling our API. Please reach out to us to resolve it.").createNewState())
        return
      }

      const token = await response.text()
      await storeAuthenticationTokenInBrowser(token)
      setAppState(appState.withPage(Page.User).withAuthenticationToken(token).withNotification("").createNewState())
    },
    onError: (error: Error) => {
      setAppState(appState.withNotification(`Something went wrong inside the extension. Error message: ${error.message}`).createNewState())
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-10">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
          />
        </div>

        <div>
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
          />
        </div>

        <div className='mt-5'>
          <Button type="submit">Log in</Button>
        </div>
      </form>
      <Button type="button" onClick={() => {
        setAppState(appState.withPage(Page.Register).withNotification("").createNewState())
      }}>Go to register</Button>
    </>
  )
}

async function storeAuthenticationTokenInBrowser(token: string) {
  await chrome.storage.local.set({ authenticationToken: token })
}

const fetchAuthenticationToken = (email: string, password: string) => {
  return fetch(import.meta.env.VITE_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

export default Login;