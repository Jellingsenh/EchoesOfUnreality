import { StrictMode } from "react"
import { baseWebUrl } from "../../../../resources/constants"
import { Root } from "../../../Echoes"

Root.render(
  <StrictMode>
    <SignUp />
  </StrictMode>,
)

function SignUp() {
  return (
    <>
      <div>josh sign up here</div>
      <div></div>
      <a href={baseWebUrl}>Home</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account"}>{'< Account'}</a>
      <div></div>
      <a href={baseWebUrl + "/routes/account/login"}>Log In</a>
    </>
  )
}
