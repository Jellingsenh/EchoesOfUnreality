import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { baseWebUrl } from '../resources/constants'

export const Root = createRoot(document.getElementById('root')!)

Root.render(
  <StrictMode>
    <Echoes />
  </StrictMode>,
);

function Echoes() {
  return (
    <>
      <div>josh echoes here</div>
      <div></div>
      <a href={baseWebUrl + "/routes/account"}>Account</a>
      <div></div>
      <a href={baseWebUrl + "/routes/gamemanagement"}>Game Management</a>
      <div></div>
      <a href={baseWebUrl + "/routes/playerview"}>Player View</a>
      <div></div>
      <a href={baseWebUrl + "/routes/rules"}>Rules</a>
      <div></div>
      <a href={baseWebUrl + "/routes/support"}>Support</a>
      {/* <button
        type="button"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button> */}
    </>
  )
}