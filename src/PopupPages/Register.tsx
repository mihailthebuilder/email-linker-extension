import { ChangeEvent, FormEvent, useState } from 'react'
import { Page } from '../enums'

import {
    useMutation,
} from 'react-query'
import useNavigation from '../useNavigations'

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setPage = useNavigation()

    const handleRegisterSubmit = async (e: FormEvent) => {
        e.preventDefault()
        registerMutation.mutate()
    }

    const registerMutation = useMutation({
        mutationFn: () => { return register(email, password) },
        onSuccess: () => {
            console.log("successfully registered")
        }
    })

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegisterSubmit}>
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