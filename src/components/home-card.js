import React, { useRef } from "react"
import styled from "styled-components"
import { MdCloudUpload } from "react-icons/md"
import { motion } from "framer-motion"

import Logo from "../images/logo-home.svg"

export const HomeCard = ({ handlePhotoUpload, setUploaded }) => {
  const fileInputRef = useRef()

  return (
    <Wrapper>
      <Top>
        <img src={Logo} alt="logo" width={375} />
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
            onClick={() => fileInputRef.current.click()}
          >
            <MdCloudUpload style={{ marginRight: 10 }} />
            Upload image
          </UploadButton>
        </form>
      </Bottom>
    </Wrapper>
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
  /* border-radius: 25px; */
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
  box-shadow: 0 5px #623caa;
  cursor: pointer;
`

const Tag = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1.8rem;
  color: #623caa;
  /* font-style: italic; */
  /* letter-spacing: 0.5px; */
`
