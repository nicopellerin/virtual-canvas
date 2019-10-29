import React from "react"
import styled from "styled-components"
import { MdExitToApp } from "react-icons/md"
import cookie from "js-cookie"
import { navigate } from "gatsby"

const Logout = () => {
  const handleLogout = () => {
    cookie.remove("vc_token")
    navigate("/login")
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
