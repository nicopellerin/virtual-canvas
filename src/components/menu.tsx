import React, { useContext } from 'react'
import styled from 'styled-components'
import { MdExitToApp } from 'react-icons/md'
import cookie from 'js-cookie'
import { navigate, Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'

import { UserContext } from '../context/user-context'

const Menu = () => {
  const { setUserToken, setUser, user } = useContext(UserContext)

  // Logout flow
  const handleLogout = () => {
    cookie.remove('vc_token')
    cookie.remove('vc_user')
    setUserToken('')
    setUser('')

    if (typeof window !== 'undefined') {
      navigate('/login')
    }
  }

  return (
    <Wrapper>
      <Link to={`/profile/${user}`}>
        <ViewProfile>View public profile</ViewProfile>
      </Link>
      <Separator>|</Separator>
      <LogoutWrapper data-tip="Logout" onClick={handleLogout}>
        <MdExitToApp />
        <ReactTooltip />
      </LogoutWrapper>
    </Wrapper>
  )
}

export default Menu

// Styles
const Wrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
`

const ViewProfile = styled.span`
  color: #f4f4f4;
  font-size: 1.4rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`

const Separator = styled.span`
  margin: 0 2rem;
  font-size: 1.6rem;
`

const LogoutWrapper = styled.span`
  color: #623cea;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`
