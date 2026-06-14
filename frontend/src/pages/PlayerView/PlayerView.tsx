import { StrictMode } from "react"
import { baseWebUrl } from "../../../resources/constants"
import { Root } from "../../Echoes"

Root.render(
  <StrictMode>
    <PlayerView />
  </StrictMode>,
)

function PlayerView() {
  return (
    <>
      <div>josh player view here</div>
      <div></div>
      <a href={baseWebUrl}>{'< Home'}</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview/character"}>Character</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview/combat"}>Combat</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview/exploration"}>Exploration</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview/crew"}>Crew</a>
    </>
  )
}
