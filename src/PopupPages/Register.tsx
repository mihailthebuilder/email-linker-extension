import { ChangeEvent, FormEvent, useState } from 'react'
import { Page } from '../enums'

import {
  useMutation,
} from 'react-query'
import { useNotification, useNavigation } from '../Contexts'

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const setPage = useNavigation()
  const setNotification = useNotification()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  const mutation = useMutation({
    mutationFn: () => { return register(email, password) },
    onSuccess: () => {
      setNotification("registration successful. please verify your email")
      setPage(Page.Login)
    }
  })

  return (
    <>
      <h1>Register</h1>
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
        <button onClick={() => setPage(Page.Login)}>
          Go to log in
        </button>
      </div>
    </>
  )
}


const register = async (email: string, password: string) => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/auth/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register")
  }
}


export default Register;