import { StrictMode } from "react"
import { baseWebUrl } from "../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Characters />
  </StrictMode>,
)

function Characters() {
  return (
    <>
      <div>josh characters here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement"}>{'< Game Management'}</a>
    </>
  )
}
