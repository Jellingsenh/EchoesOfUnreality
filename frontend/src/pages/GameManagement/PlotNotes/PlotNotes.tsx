import { StrictMode } from "react"
import { baseWebUrl } from "../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <PlotNotes />
  </StrictMode>,
)

function PlotNotes() {
  return (
    <>
      <div>josh plot notes here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement"}>{'< Game Management'}</a>
    </>
  )
}
