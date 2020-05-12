import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { MdChevronLeft } from 'react-icons/md'
import { queryCache } from 'react-query'

import useSelectedImage from '../../hooks/useSelectedImage'

const ProfileBack = ({ token }) => {
  const publicProfile = queryCache.getQueryData('publicProfile')
  const { selectedImage } = useSelectedImage()

  if (!token) return null

  return (
    <Wrapper backgroundColor={selectedImage?.background ? true : false}>
      <MdChevronLeft
        color={selectedImage?.background ? '#333' : '#f4f4f4'}
        size={24}
      />
      <Link to={`/editor/${publicProfile?.username}`}>Back to editor</Link>
    </Wrapper>
  )
}

export default ProfileBack

// Styles
const Wrapper = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 4rem;
  display: flex;
  align-items: center;

  a {
    color: ${(props: { backgroundColor: boolean }) =>
      props.backgroundColor ? '#333' : '#f4f4f4'};
    font-size: 1.4rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
