import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaInstagram, FaFacebook, FaGlobe } from 'react-icons/fa'

import { ArtworkContext } from '../../context/artwork-context'
import { UserContext } from '../../context/user-context'

const ProfileUsername = () => {
  const { backgroundColor, username } = useContext(ArtworkContext)
  const { socialLinks } = useContext(UserContext)

  return (
    <Wrapper>
      <Username backgroundColor={backgroundColor ? true : false}>
        {username}
      </Username>
      <Separator>|</Separator>
      <Social backgroundColor={backgroundColor ? true : false}>
        {socialLinks.instagram && (
          <a
            href={`https://instagram.com/${socialLinks.instagram}`}
            target="_blank"
            rel="nofollower"
          >
            <FaInstagram size={20} />
          </a>
        )}
        {socialLinks.facebook && (
          <a
            href={`https://facebook.com/${socialLinks.facebook}`}
            target="_blank"
            rel="nofollower"
          >
            <FaFacebook size={20} />
          </a>
        )}
        {socialLinks.website && (
          <a href={`${socialLinks.website}`} target="_blank" rel="nofollower">
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
