import { StrictMode } from "react"
import { baseWebUrl } from "../../../resources/constants"
import { Root } from "../../Echoes"

Root.render(
  <StrictMode>
    <Account />
  </StrictMode>,
)

function Account() {
  return (
    <>
      <div>josh account here</div>
      <div></div>
      <a href={baseWebUrl}>{'< Home'}</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account/signup"}>Sign Up</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account/login"}>Log In</a>
    </>
  )
}
