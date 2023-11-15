import 'react'
import { useState } from 'react'
import { useAppState } from '../Contexts'
import { useMutation } from 'react-query'
import TextInput from '../Components/TextInput/TextInput'
import Button from '../Components/Button/Button'
import { Page } from '../enums'

function User() {
  const { appState, setAppState } = useAppState()
  const [linkToTrack, setLinkToTrack] = useState("")
  const [linkTag, setLinkTag] = useState("")
  const [trackedLink, setTrackedLink] = useState("")

  const mutation = useMutation({
    mutationFn: () => { return fetchTrackedLink(linkToTrack, appState.authenticationToken, linkTag) },
    onSuccess: async (response) => {
      if (response.status === 401) {
        setAppState(appState.withPage(Page.Login).withAuthenticationToken("").withNotification("Please log in again.").createNewState())
        return
      }

      if (!response.ok) {
        setAppState(appState.withNotification("Something went wrong when calling our API. Please reach out to us to resolve it.").createNewState())
        return
      }

      const trackedLink = await response.text()

      setTrackedLink(trackedLink)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault()
    await chrome.storage.local.remove(["authenticationToken"])
    setAppState(appState.withPage(Page.Login).withAuthenticationToken("").createNewState())
  }

  const onLinkInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLinkToTrack(event.currentTarget.value)
    if (trackedLink.length > 0) {
      setTrackedLink("")
    }
  }

  const onTagInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLinkTag(event.currentTarget.value)
    if (trackedLink.length > 0) {
      setTrackedLink("")
    }
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
          onChange={onLinkInputChange}
        />
        <label htmlFor="tag">Add a tag (optional)</label>
        <TextInput
          type="text"
          name="tag"
          id="tag"
          value={linkTag}
          onChange={onTagInputChange}
        />
        <Button type="submit">Get tracked link</Button>
      </form>
      <Button type="button" onClick={handleSignOut}>Sign out</Button>
      {trackedLink.length > 0 && <TrackedLink link={trackedLink} />}
    </>

  )
}

function TrackedLink({ link }: { link: string }) {
  const [linkCopied, setLinkCopied] = useState(false)

  const copyLinkToClipBoard = () => {
    navigator.clipboard.writeText(link)
    setLinkCopied(true)
  }

  return (
    <>
      <div>Tracked link (click to copy to clipboard)</div>
      <div
        className="bg-gray-800 p-1 rounded shadow-md text-white cursor-pointer"
        onClick={copyLinkToClipBoard}
      >
        {link}
      </div>
      {linkCopied && <div>Copied!</div>}
    </>
  )
}

async function fetchTrackedLink(url: string, authenticationToken: string, tag: string) {
  return fetch(import.meta.env.VITE_API_URL + "/user/tracklink", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authenticationToken}`
    },
    body: JSON.stringify({ url, tag }),
  });
}

export default User