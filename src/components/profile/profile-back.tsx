import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { MdChevronLeft } from 'react-icons/md'

import { UserContext } from '../../context/user-context'
import { ArtworkContext } from '../../context/artwork-context'

const ProfileBack = () => {
  const { user } = useContext(UserContext)
  const { backgroundColor } = useContext(ArtworkContext)

  if (!user) return null

  return (
    <Wrapper backgroundColor={backgroundColor ? true : false}>
      <MdChevronLeft color={backgroundColor ? '#333' : '#f4f4f4'} size={24} />
      <Link to={`/editor/${user}`}>Back to editor</Link>
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
    color: ${props => (props.backgroundColor ? '#333' : '#f4f4f4')};
    font-size: 1.4rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
