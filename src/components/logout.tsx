import React, { useContext } from "react"
import styled from "styled-components"
import { MdExitToApp } from "react-icons/md"
import cookie from "js-cookie"
import { navigate } from "gatsby"

import { UserContext } from "../context/user-context"

const Logout = () => {
  const { setUserToken } = useContext(UserContext)

  // Logout flow
  const handleLogout = () => {
    cookie.remove("vc_token")
    setUserToken("")

    if (typeof window !== "undefined") {
      navigate("/login")
    }
  }

  return (
    <div>
      <LogoutWrapper onClick={handleLogout}>
        <MdExitToApp />
      </LogoutWrapper>
    </div>
  )
}

export default Logout

// Styles
const LogoutWrapper = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #623cea;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`
