import React, { useContext } from 'react'
import styled from 'styled-components'

import { ArtworkContext } from '../../context/artwork-context'

const ProfileUsername = () => {
  const { backgroundColor, username } = useContext(ArtworkContext)

  return (
    <Wrapper>
      <Username backgroundColor={backgroundColor ? true : false}>
        {username}
      </Username>
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
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
`
