import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdCloudUpload } from 'react-icons/md'
import { motion } from 'framer-motion'

interface Props {
  handlePhotoUpload: (e: React.FormEvent<HTMLInputElement>) => void
  setUploaded: Dispatch<SetStateAction<boolean>>
  loader: string
}

const AddArtwork: React.FC<Props> = ({
  handlePhotoUpload,
  setUploaded,
  loader,
}) => {
  const [show, setShow] = useState<boolean>(false)

  const fileInputRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <motion.div
      style={{ opacity: 0 }}
      animate={{ opacity: [0, 0.2, 1] }}
      transition={{ delay: 0.5, duration: 0.2 }}
    >
      {show && (
        <Wrapper>
          <Title>No artwork detected</Title>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            accept="image/x-png,image/jpeg"
            onChange={e => {
              handlePhotoUpload(e)
              setUploaded(true)
            }}
          />
          <UploadButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <CloudUploadIcon />
            {loader ? loader : 'Upload image'}
          </UploadButton>
        </Wrapper>
      )}
    </motion.div>
  )
}

export default AddArtwork

// Styles
const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  color: #f4f4f4;
  font-size: 5rem;
`

const UploadButton = styled(motion.button)`
  background: #623cea;
  padding: 1.5rem 3.5rem;
  border: none;
  color: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 5px;
  box-shadow: 0 5px #4923d1;
  width: 25rem;
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
