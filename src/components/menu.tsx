import React from 'react'
import styled from 'styled-components'
import { MdExitToApp } from 'react-icons/md'
import cookie from 'js-cookie'
import { navigate, Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'

import { useStores } from '../stores/useStores'

const Menu = () => {
  const { artworkStore, userStore } = useStores()

  // Logout flow
  const handleLogout = () => {
    cookie.remove('vc_token')
    cookie.remove('vc_user')
    userStore.userToken = ''
    userStore.username = ''

    if (typeof window !== 'undefined') {
      navigate('/login')
    }
  }

  return (
    <Wrapper>
      <ViewProfile
        to={`/profile/${userStore.username}`}
        backgroundColor={artworkStore.imageInfo.backgroundColor ? true : false}
      >
        View public profile
      </ViewProfile>
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

const ViewProfile = styled(Link)`
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;

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
