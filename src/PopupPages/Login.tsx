import { ChangeEvent, FormEvent, useState } from 'react'
import { Page } from '../enums'

import {
    useMutation,
} from 'react-query'
import useNavigation from '../useNavigations'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [, setAuthenticationToken] = useState("")
    const setPage = useNavigation()


    const loginMutation = useMutation({
        mutationFn: () => { return fetchLoginAuthenticationToken(email, password) },
        onSuccess: (data) => {
            setAuthenticationToken(data)
            console.log("authentication token updated to:", data)
        },
    })

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault()
        loginMutation.mutate()
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
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
                <button onClick={() => setPage(Page.Register)}>
                    Go to register
                </button>
            </div>
        </>
    )
}


const fetchLoginAuthenticationToken = async (email: string, password: string) => {
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