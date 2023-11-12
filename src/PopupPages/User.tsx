import 'react'
import { useState } from 'react'
import { useAppState } from '../Contexts'
import { useMutation } from 'react-query'
import TextInput from '../Components/TextInput/TextInput'
import Button from '../Components/Button/Button'

function User() {
    const { appState } = useAppState()
    const [linkToTrack, setLinkToTrack] = useState("")
    const [trackedLink, setTrackedLink] = useState("")

    const mutation = useMutation({
        mutationFn: () => { return fetchTrackedLink(linkToTrack, appState.authenticationToken, "") },
        onSuccess: (trackedLink) => {
            setTrackedLink(trackedLink)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate()
    }

    const onInputLinkChange = (event: React.FormEvent<HTMLInputElement>) => {
        setLinkToTrack(event.currentTarget.value)
        setTrackedLink("")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="link">Link to track</label>
                <TextInput
                    type="text"
                    name="link"
                    id="link"
                    value={linkToTrack}
                    onChange={onInputLinkChange}
                />
                <Button type="submit">Get tracked link</Button>
            </form>
            {trackedLink.length > 0 && <div>Tracked link is {trackedLink}</div>}
        </>

    )
}

async function fetchTrackedLink(url: string, authenticationToken: string, emailSubject: string) {
    const response = await fetch(import.meta.env.VITE_API_URL + "/user/tracklink", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticationToken}`
        },
        body: JSON.stringify({ url, emailSubject }),
    });

    if (!response.ok) {
        throw new Error("Failed to register")
    }

    return response.text()
}

export default User