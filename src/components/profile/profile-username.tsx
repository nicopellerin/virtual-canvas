import React from 'react'
import styled from 'styled-components'
import { FaInstagram, FaFacebook, FaGlobe } from 'react-icons/fa'

import { useStores } from '../../stores/useStores'
import { observer } from 'mobx-react-lite'

const ProfileUsername = () => {
  const { userStore, artworkStore } = useStores()

  return (
    <Wrapper>
      <Username
        backgroundColor={artworkStore.imageInfo.backgroundColor ? true : false}
      >
        {userStore.username}
      </Username>
      <Separator>|</Separator>
      <Social
        backgroundColor={artworkStore.imageInfo.backgroundColor ? true : false}
      >
        {userStore.socialLinks.instagram && (
          <a
            href={`https://instagram.com/${userStore.socialLinks.instagram}`}
            target="_blank"
            rel="nofollower"
          >
            <FaInstagram size={20} />
          </a>
        )}
        {userStore.socialLinks.facebook && (
          <a
            href={`https://facebook.com/${userStore.socialLinks.facebook}`}
            target="_blank"
            rel="nofollower"
          >
            <FaFacebook size={20} />
          </a>
        )}
        {userStore.socialLinks.website && (
          <a
            href={`${userStore.socialLinks.website}`}
            target="_blank"
            rel="nofollower"
          >
            <FaGlobe size={20} />
          </a>
        )}
      </Social>
    </Wrapper>
  )
}

export default observer(ProfileUsername)

// Styles
const Wrapper = styled.div`
  position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`

const Username = styled.span`
  margin-right: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
`

const Separator = styled.span`
  margin: 0 0.7rem 0 0rem;
  font-size: 1.6rem;
`

const Social = styled.div`
  display: flex;
  align-items: center;

  a {
    color: ${(props: { backgroundColor: boolean }) =>
      props.backgroundColor ? '#333' : '#f4f4f4'};
  }

  & > * {
    margin-left: 1rem;
  }
`
