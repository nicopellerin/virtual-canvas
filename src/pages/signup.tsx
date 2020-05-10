import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import axios from 'axios'
import cookie from 'js-cookie'
import { Circle } from 'better-react-spinkit'

import SEO from '../components/seo'

import LogoHome from '../images/logo-text.svg'

import { useStores } from '../stores/useStores'
import { request } from 'graphql-request'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { userStore } = useStores()

  // Signup flow
  const handleSignup = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const query = `
      mutation signupUser($input: SignupUserInput!) {
        signupUser(input: $input) {
          authToken {
            accessToken
            expiredAt
          }
          user {
            id
            email	
            username
            social {
              instagram
            }
          }
        }
      }
    `

      const { signupUser } = await request(
        'http://localhost:8080/query',
        query,
        {
          input: {
            username,
            password,
            email,
          },
        }
      )

      cookie.set('vc_token', signupUser.authToken.accessToken)
      cookie.set('vc_user', signupUser.user.username)
      userStore.userToken = signupUser.authToken.accessToken
      userStore.username = signupUser.user.username

      if (typeof window !== 'undefined') {
        window.location.replace(`/editor/${signupUser.user.username}`)
      }
    } catch (err) {
      if (err.response.errors[0].message === 'User already exists') {
        setErrorMsg('Username already exists!')
      } else if (
        err.response.errors[0].message ===
        'Please choose a password with a minimum of 8 characters'
      ) {
        setErrorMsg('Please choose a password with a minimum of 8 characters')
      } else {
        setErrorMsg('Please fill in all required fields')
      }
      setTimeout(() => setErrorMsg(''), 4000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Signup | Virtual Canvas"
        description="Turn your art into a virtual 3D canvas"
      />

      <Wrapper>
        <Card>
          <Link to="/">
            <Logo src={LogoHome} alt="logo" />
          </Link>
          <Title>Sign up for an account</Title>
          <form onSubmit={handleSignup} autoComplete="false">
            <FieldRow>
              <InputField
                name="username"
                id="username"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
              />
            </FieldRow>
            <FieldRow>
              <InputField
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </FieldRow>
            <FieldRow>
              <InputField
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </FieldRow>
            <div style={{ position: 'relative' }}>
              <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ButtonContent>
                  {loading ? (
                    <>
                      <Circle color="white" style={{ marginRight: 10 }} />{' '}
                      Signing up...
                    </>
                  ) : (
                    'Sign up'
                  )}
                </ButtonContent>
              </Button>
              {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            </div>
          </form>
          <Text>
            <Link to="/login">
              Already have an account? Click here to sign in!
            </Link>
          </Text>
        </Card>
        <FooterText>
          © {new Date().getFullYear()} Virtual Canvas. Made in Montreal by Nico
          Pellerin.
        </FooterText>
      </Wrapper>
    </>
  )
}

export default SignupPage

// Styles
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  padding: 8rem 4rem;
  min-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border-radius: 23px;
  text-align: center;

  @media (max-width: 700px) {
    min-width: 320px;
    border-radius: 23px;
  }
`

const Logo = styled.img`
  width: 375px;
  margin-bottom: 3rem;

  @media (max-width: 700px) {
    width: 275px;
  }
`

const Title = styled.h1`
  margin: 0;
  margin-bottom: 3rem;
  font-size: 1.8rem;
  font-weight: 300;
`

const FieldRow = styled.div`
  margin-bottom: 1.5rem;
`

const InputField = styled.input`
  padding: 15px;
  border-radius: 5px;
  border: none;
  min-width: 30rem;
  font-size: 1.4rem;
  font-family: inherit;
  background: ghostwhite;
`

const Button = styled(motion.button)`
  background: #623cea;
  padding: 1.5rem 3.8rem;
  min-width: 205px;
  margin-top: 1.5rem;
  border: none;
  color: ghostwhite;
  font-size: 1.6rem;
  border-radius: 5px;
  box-shadow: 0 5px #4923d1;
  cursor: pointer;

  @media (max-width: 700px) {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
`

const Text = styled.span`
  margin-top: 5rem;
  font-size: 1.2rem;

  a {
    color: #333;
  }
`

const FooterText = styled.h6`
  position: absolute;
  bottom: 1rem;
  display: block;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  font-family: 'Nunito Sans', sans-serif;
  letter-spacing: 0.2px;
  color: #555;

  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorMsg = styled.span`
  position: absolute;
  left: 50%;
  bottom: -3.5rem;
  transform: translateX(-50%);
  width: 100%;
  font-size: 1.2rem;
  color: red;
`
