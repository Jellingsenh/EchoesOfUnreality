import { StrictMode } from "react"
import { baseWebUrl } from "../../resources/constants"
import { Root } from "../../Echoes"

Root.render(
  <StrictMode>
    <Support />
  </StrictMode>,
)

function Support() {
  return (
    <>
      <div>support josh here</div>
      <div></div>
      <a href={baseWebUrl}>{'< Home'}</a>
      <div></div>
      <a href={baseWebUrl + "/routes/support/subscribe"}>Subscribe</a>
      <div></div>
      <a href={baseWebUrl + "/routes/support/donate"}>Donate</a>
      <div></div>
      <a href={baseWebUrl + "/routes/support/contact"}>Contact</a>
    </>
  )
}

