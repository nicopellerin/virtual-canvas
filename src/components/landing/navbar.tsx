import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'

import Logo from '../../images/logo-text.svg'

const Navbar = () => {
  const [showButtons, setShowButtons] = useState(true)

  useEffect(() => {
    if (window.location.pathname !== '/') {
      setShowButtons(false)
    }
  })

  return (
    <Wrapper>
      <Container showButtons={showButtons ? true : false}>
        <Link to="/">
          <LogoStyled src={Logo} alt="Logo" />
        </Link>
        {showButtons && (
          <ButtonGroup>
            <Link to="/login">
              <LoginButton
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
              >
                Login
              </LoginButton>
            </Link>
            <Link to="/signup">
              <SignupButton
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
              >
                Signup
              </SignupButton>
            </Link>
          </ButtonGroup>
        )}
      </Container>
    </Wrapper>
  )
}

export default Navbar

// Styles
const Wrapper = styled.div`
  padding: 0 2rem;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.showButtons ? 'space-between' : 'center')};
  height: 9rem;
  width: 100%;
  max-width: 130rem;
  margin: 0 auto;
`

const LogoStyled = styled.img`
  width: 30rem;
`

const ButtonGroup = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }
`

const LoginButton = styled(motion.button)`
  background: none;
  width: 140px;
  height: 45px;
  min-width: 105px;
  border: 1px solid #333;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 5px;
  box-shadow: 0 5px #333;
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
