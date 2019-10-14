import React, { useRef, Dispatch, ReactElement, SetStateAction } from "react"
import styled from "styled-components"
import { MdCloudUpload } from "react-icons/md"
import { motion } from "framer-motion"

import LogoHome from "../images/logo-home.svg"

interface Props {
  handlePhotoUpload: (e: React.FormEvent<HTMLInputElement>) => void
  setUploaded: Dispatch<SetStateAction<boolean>>
}

export const HomeCard = ({ handlePhotoUpload, setUploaded }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Wrapper>
        <Top>
          <Logo src={LogoHome} alt="logo" />
          <Tag>Turn your art into a virtual 3D canvas</Tag>
        </Top>
        <Bottom>
          <form onSubmit={e => e.preventDefault()}>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={e => {
                handlePhotoUpload(e)
                setUploaded(true)
              }}
            />
            <UploadButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              <CloudUploadIcon />
              Upload image
            </UploadButton>
          </form>
        </Bottom>
      </Wrapper>
      <FooterText>Made in Montreal by Nico Pellerin</FooterText>
    </>
  )
}

// Styles
const Wrapper = styled.div`
  background: ghostwhite;
  width: 100%;
  min-height: 100%;
  min-width: 620px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

  @media (max-width: 700px) {
    min-width: 320px;
    border-radius: 23px;
  }
`

const Top = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Bottom = styled.div`
  background: #f4f4f4;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  width: 100%;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  box-shadow: 0 -10px 15px rgba(0, 0, 0, 0.1);
`

const UploadButton = styled(motion.button)`
  background: #623cea;
  padding: 1.5rem 3.8rem;
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

const CloudUploadIcon = styled(MdCloudUpload)`
  font-size: 2rem;
  margin-right: 8px;

  @media (max-width: 700px) {
    font-size: 1.8rem;
    margin-right: 7px;
  }
`

const Tag = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Nunito Sans", sans-serif;
  letter-spacing: 0.2px;
  text-align: center;
  margin-top: 1.2rem;
  color: #555;

  @media (max-width: 700px) {
    font-size: 1.4rem;
  }
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

const Logo = styled.img`
  width: 410px;

  @media (max-width: 700px) {
    width: 275px;
  }
`
