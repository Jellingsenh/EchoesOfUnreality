import { StrictMode } from "react"
import { baseWebUrl } from "../../../resources/constants"
import { Root } from "../../Echoes"

Root.render(
  <StrictMode>
    <GameManagement />
  </StrictMode>,
)

function GameManagement() {
  return (
    <>
      <div>josh game management here</div>
      <div></div>
      <a href={baseWebUrl}>{'< Home'}</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement/locations"}>Locations</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement/characters"}>Characters</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement/combat"}>Combat</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement/exploration"}>Exploration</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement/items"}>Items</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement/plotnotes"}>Plot Notes</a>
    </>
  )
}
