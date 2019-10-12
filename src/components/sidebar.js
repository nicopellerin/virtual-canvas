import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { MdAddAPhoto, MdAdd, MdRemove, MdPhotoCamera } from "react-icons/md"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"

import Checkbox from "./checkbox"

import Logo from "../images/logo-text.svg"

export const Sidebar = ({
  checkedBackground,
  setCheckedBackground,
  handlePhotoUpload,
  rotateCanvas,
  setRotateCanvas,
  lightIntensity,
  setLightIntensity,
  showTexture,
  setShowTexture,
  showBorder,
  setShowBorder,
  saveAsImage,
}) => {
  const [toggle, setToggle] = useState(false)

  const fileInputRef = useRef()

  const slideInOut = useSpring({
    transform: toggle ? "translate3d(0, -50%, 0)" : "translate3d(88%, -50%, 0)",
    config: { mass: 1, tension: 120, friction: 18 },
  })

  return (
    <div>
      <Wrapper toggle={toggle ? 1 : 0} style={slideInOut}>
        <ToggleButton onClick={() => setToggle(prev => !prev)}>
          {toggle ? <MdRemove size={26} /> : <MdAdd size={26} />}
        </ToggleButton>
        <Container>
          <TempLogo>
            <img src={Logo} alt="logo" width={270} />
          </TempLogo>
          <Elements>
            <RotateCheckbox>
              <label>
                <Checkbox
                  checked={rotateCanvas}
                  onChange={() => setRotateCanvas(prev => !prev)}
                />
                <RotateCheckboxLabel>Auto-rotate</RotateCheckboxLabel>
              </label>
            </RotateCheckbox>
            <BorderCheckbox>
              <label>
                <Checkbox
                  checked={showBorder}
                  onChange={() => setShowBorder(prevState => !prevState)}
                />
                <BorderCheckboxLabel>Border</BorderCheckboxLabel>
              </label>
            </BorderCheckbox>
            <TextureCheckbox>
              <label>
                <Checkbox
                  checked={showTexture}
                  onChange={() => setShowTexture(prevState => !prevState)}
                />
                <TextureCheckboxLabel>Texture</TextureCheckboxLabel>
              </label>
            </TextureCheckbox>
            {/* <BackdropCheckbox>
              <label>
                <Checkbox
                  checked={checkedBackground}
                  onChange={() => setCheckedBackground(prevState => !prevState)}
                />
                <BackdropCheckboxLabel>VR backdrop</BackdropCheckboxLabel>
              </label>
            </BackdropCheckbox> */}
          </Elements>
          <ZoomRange>
            <ZoomTitle>Spotlight intensity</ZoomTitle>
            <ZoomText>{lightIntensity}%</ZoomText>
            <input
              type="range"
              min="0"
              max="20"
              onChange={e => setLightIntensity(e.target.value)}
              value={lightIntensity}
            />
          </ZoomRange>
          <DownloadButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => saveAsImage()}
          >
            <MdPhotoCamera style={{ marginRight: 10 }} />
            Take screenshot
          </DownloadButton>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={e => {
              handlePhotoUpload(e)
            }}
          />
          <ResetButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current.click()}
          >
            <MdAddAPhoto style={{ marginRight: 10 }} />
            Add image to gallery
          </ResetButton>
        </Container>
        <Bar />
      </Wrapper>
    </div>
  )
}

// Styles
const Wrapper = styled(animated.div)`
  background: white;
  padding: 6rem 5rem;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  position: absolute;
  z-index: 1000;
  top: 50%;
  right: 0rem;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.15);
  z-index: 2;

  input[type="range"] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: grab;
    animate: 0.2s;
    background: #f4f4f4;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-webkit-slider-thumb {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: #ff1654;
    cursor: grab;
    -webkit-appearance: none;
    margin-top: -9px;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #f4f4f4;
  }
  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: grab;
    animate: 0.2s;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-moz-range-thumb {
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
  }
  input[type="range"]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
  }
  input[type="range"]::-ms-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: #3071a9;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #367ebd;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`

const Bar = styled.div`
  content: "";
  height: 90%;
  width: 17px;
  background: #dddddd;
  position: absolute;
  border-top-left-radius: 23px;
  border-bottom-left-radius: 23px;
  top: 50%;
  left: -17px;
  z-index: 2000;
  transform: translateY(-50%);
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.15);
`

const Elements = styled.div`
  display: flex;
  flex-direction: column;
`

const RotateCheckbox = styled.div`
  margin-top: 0;
  margin-bottom: 5;
`

const RotateCheckboxLabel = styled.span`
  font-size: 13px;
  margin-left: 10px;
  font-weight: 500;
`

const BackdropCheckbox = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

const BackdropCheckboxLabel = styled.span`
  font-size: 13px;
  margin-left: 10px;
  font-weight: 500;
`

const BorderCheckbox = styled.div`
  margin-top: 10px;
`

const BorderCheckboxLabel = styled.span`
  font-size: 13px;
  margin-left: 10px;
  font-weight: 500;
`

const TextureCheckbox = styled.div`
  margin-top: 10px;
`

const TextureCheckboxLabel = styled.span`
  font-size: 13px;
  margin-left: 10px;
  font-weight: 500;
`

const ZoomRange = styled.div`
  margin-top: 5px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`

const ZoomTitle = styled.h5`
  font-size: 14px;
  margin-bottom: 10px;
`

const ZoomText = styled.span``

const DownloadButton = styled(motion.button)`
  background: #ff1654;
  padding: 1.5rem 3.8rem;
  border: none;
  color: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 5px;
  box-shadow: 0 5px #ff1654;
  cursor: pointer;
  margin-bottom: 3rem;
`

const ResetButton = styled(motion.button)`
  background: ghostwhite;
  padding: 1rem 3rem;
  border: 1px solid #333;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  border-radius: 5px;
  box-shadow: 0 5px #333;
  cursor: pointer;
  width: 21rem;
  margin: 0 auto;
`

const TempLogo = styled.h1`
  font-size: 3.5rem;
  color: #333;
  margin-top: 0;
  margin-bottom: 3.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
`

const LogoStyled = styled.img`
  width: 40px;
  margin-right: 12px;
`

const ToggleButton = styled.button`
  position: absolute;
  left: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
`
