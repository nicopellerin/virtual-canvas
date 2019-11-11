import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { MdAccountCircle } from "react-icons/md"

const ProfileCta = () => {
  return (
    <Wrapper>
      <a href="/signup" target="_blank" rel="noopener">
        <UploadButton whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
          <MdAccountCircle style={{ marginRight: 7 }} />
          Sign up
        </UploadButton>
      </a>
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

const UploadButton = styled(motion.button)`
  background: #623cea;
  padding: 1.5rem 3.8rem;
  min-width: 105px;
  border: none;
  color: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 5px;
  box-shadow: 0 5px #4923d1;
  cursor: pointer;

  @media (max-width: 700px) {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
`
