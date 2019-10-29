import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import axios from "axios"
import { Circle } from "better-react-spinkit"
import { MdCheckCircle } from "react-icons/md"
import cookie from "js-cookie"
import { Link, navigate } from "gatsby"
import SEO from "../components/seo"

import BG from "../images/vg.jpg"
import LogoHome from "../images/logo-text.svg"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async e => {
    e.preventDefault()

    setLoading(true)

    const user = {
      username,
      password,
    }

    try {
      const res = await axios.post("http://localhost:8080/api/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(res)
      if (res.status === 200) {
        setLoggedIn(true)
        cookie.set("vc_token", res.data)
        setTimeout(() => {
          window.location.replace("/app")
        }, 1000)
      }
    } catch (err) {
      setErrorMsg("Invalid login! Please try again.")
      setTimeout(() => setErrorMsg(""), 4000)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Login | Virtual Canvas"
        description="Turn your art into a virtual 3D canvas"
      />
      <Wrapper background={BG}>
        <Card>
          <Logo src={LogoHome} alt="logo" />
          <Title>Sign in to your account</Title>
          <form onSubmit={handleLogin} autoComplete="false" auto>
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
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </FieldRow>
            <div style={{ position: "relative" }}>
              <Button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                loggedIn={loggedIn ? true : false}
              >
                <ButtonContent>
                  {loading ? (
                    <>
                      <Circle color="white" style={{ marginRight: 10 }} />{" "}
                      Signing in...
                    </>
                  ) : loggedIn ? (
                    <>
                      <MdCheckCircle
                        color="white"
                        style={{ marginRight: 10 }}
                      />{" "}
                      Logged in!
                    </>
                  ) : (
                    "Sign in"
                  )}
                </ButtonContent>
              </Button>
              {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            </div>
          </form>
          <Text>
            <Link to="/signup">
              Don't have an account? Click here to sign up!
            </Link>
          </Text>
        </Card>
        <FooterText>Made in Montreal by Nico Pellerin</FooterText>
      </Wrapper>
    </>
  )
}

export default LoginPage

// Styles
const Wrapper = styled.div`
  background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(246, 246, 246, 0.92) 47%,
      rgba(237, 237, 237, 0.95) 100%
    ),
    url(${props => props.background});
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  background: ghostwhite;
  /* width: 100%;
  min-height: 100%; */
  padding: 8rem 4rem;
  min-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  border-radius: 23px;
  text-align: center;

  @media (max-width: 700px) {
    min-width: 320px;
    border-radius: 23px;
  }
`

const Logo = styled.img`
  width: 375px;
  margin-bottom: 2rem;

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
`

const Button = styled(motion.button)`
  background: ${props => (props.loggedIn ? "#62BF04" : "#623cea")};
  padding: 1.5rem 3.8rem;
  min-width: 205px;
  margin-top: 1.5rem;
  border: none;
  color: ghostwhite;
  font-size: 1.6rem;
  border-radius: 5px;
  box-shadow: 0 5px ${props => (props.loggedIn ? "green" : "#4923d1")};
  cursor: pointer;

  @media (max-width: 700px) {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
`

const Text = styled.span`
  margin-top: 5rem;
  font-size: 1.2rem;
`

const FooterText = styled.h6`
  position: absolute;
  bottom: 1rem;
  display: block;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
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
