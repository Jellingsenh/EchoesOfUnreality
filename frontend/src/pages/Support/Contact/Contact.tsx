import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Contact />
  </StrictMode>,
)

function Contact() {
  return (
    <>
      <div>contact josh here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/support"}>{'< Support'}</a>
    </>
  )
}
