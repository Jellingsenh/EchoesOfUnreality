import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <LogIn />
  </StrictMode>,
)

function LogIn() {
  return (
    <>
      <div>josh log in here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account"}>{'< Account'}</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account/signup"}>Sign Up</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account/resetpassword"}>Reset Password</a>
    </>
  )
}
