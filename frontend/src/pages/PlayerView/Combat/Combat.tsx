import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Combat />
  </StrictMode>,
)

function Combat() {
  return (
    <>
      <div>josh combat (player) here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview"}>{'< Player View'}</a>
    </>
  )
}
