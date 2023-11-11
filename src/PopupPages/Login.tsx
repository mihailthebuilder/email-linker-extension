import { ChangeEvent, FormEvent, useState } from 'react'
import { Page } from '../enums'

import {
  useMutation,
} from 'react-query'
import { useAppState } from '../Contexts'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { appState, setAppState } = useAppState()

  const mutation = useMutation({
    mutationFn: () => { return fetchAuthenticationToken(email, password) },
    onSuccess: async (token) => {
      await storeAuthenticationTokenInBrowser(token)
      setAppState(appState.withPage(Page.User).withAuthenticationToken(token).createNewState())
    },
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>
        <button onClick={() => setAppState(appState.withPage(Page.Register))}>
          Go to register
        </button>
      </div>
    </>
  )
}

async function storeAuthenticationTokenInBrowser(token: string) {
  await chrome.storage.local.set({ authenticationToken: token })
}

const fetchAuthenticationToken = async (email: string, password: string) => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register")
  }

  const data = await response.text() as string
  return data;
}

export default Login;