import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Exploration />
  </StrictMode>,
)

function Exploration() {
  return (
    <>
      <div>josh exploration (gm) here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement"}>{'< Game Management'}</a>
    </>
  )
}
