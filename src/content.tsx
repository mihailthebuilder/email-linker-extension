console.log("content scripts activated")

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.ctrlKey && event.altKey && event.key === "l") {
    chrome.storage.local.get(["authenticationToken"]).then((result) => {
      const token = result["authenticationToken"] as string

      if (typeof token !== "string") {
        console.error("expected token, got: ", token)
      }

      console.log("token is ", token)
    })
  }
});
