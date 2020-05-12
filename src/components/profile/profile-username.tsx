import React from 'react'
import styled from 'styled-components'
import { FaInstagram, FaFacebook, FaGlobe } from 'react-icons/fa'

import { queryCache } from 'react-query'

const ProfileUsername = () => {

  const publicProfile = queryCache.getQueryData('publicProfile')

  return (
    <Wrapper>
      <Username
        // backgroundColor={artworkStore.imageInfo.backgroundColor ? true : false}
      >
        {publicProfile?.username}
      </Username>
      <Separator>|</Separator>
      <Social
        // backgroundColor={artworkStore.imageInfo.backgroundColor ? true : false}
      >
        {publicProfile?.social?.instagram && (
          <a
            href={`https://instagram.com/${publicProfile?.social?.instagram}`}
            target="_blank"
            rel="nofollower"
          >
            <FaInstagram size={20} />
          </a>
        )}
        {publicProfile?.social?.facebook && (
          <a
            href={`https://facebook.com/${publicProfile?.social?.facebook}`}
            target="_blank"
            rel="nofollower"
          >
            <FaFacebook size={20} />
          </a>
        )}
        {publicProfile?.social?.website && (
          <a
            href={`${publicProfile?.social?.website}`}
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

export default ProfileUsername

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
