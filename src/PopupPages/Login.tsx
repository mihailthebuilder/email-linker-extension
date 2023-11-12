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
    onSuccess: async (token) => {
      await storeAuthenticationTokenInBrowser(token)
      setAppState(appState.withPage(Page.User).withAuthenticationToken(token).withNotification("").createNewState())
    },
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
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
          />
        </div>

        <div>
          <TextInput
            type="password"
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