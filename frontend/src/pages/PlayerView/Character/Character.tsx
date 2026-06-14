import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Character />
  </StrictMode>,
)

function Character() {
  return (
    <>
      <div>josh character here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview"}>{'< Player View'}</a>
    </>
  )
}
