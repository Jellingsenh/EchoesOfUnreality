import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <Donate />
  </StrictMode>,
)

function Donate() {
  return (
    <>
      <div>josh donate here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/support"}>{'< Support'}</a>
    </>
  )
}
