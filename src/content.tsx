document.addEventListener("keydown", async (event: KeyboardEvent) => {
  console.log("keydown")

  if (!keyboardShortcutTriggered(event)) {
    return
  }

  if (!zohoMailSite(document.baseURI)) {
    return
  }

  let token = ""
  try {
    token = await getAuthenticationTokenFromBrowser()
  } catch (err) {
    console.error("Error fetching authentication error: ", err)
    return
  }

  showNotification(`token is ${token}`)
})

function keyboardShortcutTriggered(event: KeyboardEvent): boolean {
  return (event.ctrlKey && event.altKey && event.key === "l")
}

async function getAuthenticationTokenFromBrowser(): Promise<string> {
  const result = await chrome.storage.local.get(["authenticationToken"])
  const token = result["authenticationToken"] as string

  if (typeof token !== "string") {
    throw Error(`expected token, got: ${token}`)
  }

  return token
}

function zohoMailSite(url: string): boolean {
  return false
}

function showNotification(message: string) {
  console.log(message)
}