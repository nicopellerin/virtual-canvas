import React, { useContext } from 'react'
import styled from 'styled-components'

import { UserContext } from '../../context/user-context'

const ProfileUsername = () => {
  const { user } = useContext(UserContext)

  return (
    <Wrapper>
      <Username>{user}</Username>
    </Wrapper>
  )
}

export default ProfileUsername

// Styles
const Wrapper = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
`

const Username = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: #f4f4f4;
`
