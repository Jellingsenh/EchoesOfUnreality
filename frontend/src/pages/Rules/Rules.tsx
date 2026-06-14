import { StrictMode } from "react"
import { baseWebUrl } from "../../../resources/constants"
import { Root } from "../../Echoes"

Root.render(
  <StrictMode>
    <Rules />
  </StrictMode>,
)

function Rules() {
  return (
    <>
      <div>josh rules here</div>
      <div></div>
      <a href={baseWebUrl}>{'< Home'}</a>
      <div></div>
      <a href={baseWebUrl + "/routes/rules/tips"}>Tips</a>
    </>
  )
}
