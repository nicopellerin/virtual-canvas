import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { MdChevronLeft } from 'react-icons/md'

import { UserContext } from '../../context/user-context'

const ProfileBack = () => {
  const { user } = useContext(UserContext)

  if (!user) return

  return (
    <Wrapper>
      <MdChevronLeft color="#f4f4f4" size={24} />
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
    color: #f4f4f4;
    font-size: 1.4rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
