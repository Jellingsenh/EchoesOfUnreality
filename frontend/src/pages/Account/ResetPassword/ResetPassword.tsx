import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <ResetPassword />
  </StrictMode>,
)

function ResetPassword() {
  return (
    <>
      <div>josh reset password here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account/login"}>{'< Log In'}</a>
    </>
  )
}