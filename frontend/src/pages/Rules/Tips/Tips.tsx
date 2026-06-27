import { StrictMode } from "react"
import { baseWebUrl } from "../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Tips />
  </StrictMode>,
)

function Tips() {
  return (
    <>
      <div>josh account here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/rules"}>{'< Rules'}</a>
    </>
  )
}