import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Crew />
  </StrictMode>,
)

function Crew() {
  return (
    <>
      <div>josh crew here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview"}>{'< Player View'}</a>
    </>
  )
}
