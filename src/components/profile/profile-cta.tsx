import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'

import { UserContext } from '../../context/user-context'

const ProfileCta = () => {
  const { user } = useContext(UserContext)

  if (user) return null

  return (
    <Wrapper>
      <ButtonGroup>
        <Link to="/login">
          <LoginButton whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
            Login
          </LoginButton>
        </Link>
        <Link to="/signup">
          <SignupButton whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
            Signup
          </SignupButton>
        </Link>
      </ButtonGroup>
    </Wrapper>
  )
}

export default ProfileCta

// Styles
const Wrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`

const ButtonGroup = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }
`

const LoginButton = styled(motion.button)`
  background: #f4f4f4;
  width: 140px;
  height: 45px;
  min-width: 105px;
  border: 1px solid #ddd;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 5px;
  box-shadow: 0 5px #ddd;
  cursor: pointer;
  margin-right: 2rem;

  @media (max-width: 700px) {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
`

const SignupButton = styled(motion.button)`
  background: #623cea;
  width: 140px;
  height: 45px;
  min-width: 105px;
  border: 1px solid transparent;
  color: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5px;
  box-shadow: 0 5px #4923d1;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 700px) {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
`
