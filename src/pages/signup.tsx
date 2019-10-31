import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import axios from "axios"
import SEO from "../components/seo"
import cookie from "js-cookie"
import { Circle } from "better-react-spinkit"

import BG from "../images/vg.jpg"
import LogoHome from "../images/logo-text.svg"

const SignupPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSignup = async e => {
    e.preventDefault()

    setLoading(true)

    const user = {
      username,
      password,
      email,
      images: [],
    }

    try {
      const res = await axios.post(
        "https://api.virtualcanvas.app/api/signup",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      cookie.set("vc_token", res.data)

      if (typeof window !== "undefined") {
        window.location.replace("/app")
      }
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMsg("Please fill in all required fields")
      } else {
        setErrorMsg("Username already exists!")
      }
      setTimeout(() => setErrorMsg(""), 4000)
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
      <Wrapper background={BG}>
        <Card>
          <Logo src={LogoHome} alt="logo" />
          <Title>Sign up for an account</Title>
          <form onSubmit={handleSignup} autoComplete="false" auto>
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
            <div style={{ position: "relative" }}>
              <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ButtonContent>
                  {loading ? (
                    <>
                      <Circle color="white" style={{ marginRight: 10 }} />{" "}
                      Signing up...
                    </>
                  ) : (
                    "Sign up"
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
        <FooterText>Made in Montreal by Nico Pellerin</FooterText>
      </Wrapper>
    </>
  )
}

export default SignupPage

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
