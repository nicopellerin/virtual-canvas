import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { motion } from 'framer-motion'
import {
  MdAddAPhoto,
  MdAdd,
  MdRemove,
  MdPhotoCamera,
  MdAddCircle,
} from 'react-icons/md'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useDebouncedEffect from 'use-debounced-effect'
import { queryCache } from 'react-query'

import Checkbox from './checkbox'
import { Toast } from './toast'

import Logo from '../images/logo-text.svg'
import SocialBar from './social-bar'
import usePhotoUpload from '../hooks/usePhotoUpload'
import { UserProfile } from '../modules/types'

interface Props {
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  loader: string
  setSnap: Dispatch<SetStateAction<boolean>>
  selectImage: any
  selectedImage: any
  updateImage: any
}

export const Sidebar: React.FC<Props> = ({
  setSnap,
  selectImage,
  selectedImage,
  updateImage,
}) => {
  const [toggle, setToggle] = useState(false)
  const [toggleProfile, setToggleProfile] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [fieldFocused, setFieldFocused] = useState('')
  const [imageName, setImageName] = useState(selectedImage?.name)
  const [lightIntensity, setLightIntensity] = useState()
  const [buyLink, setBuyLink] = useState('')
  const [price, setPrice] = useState<number>()
  const [loader, setLoader] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const userProfile = queryCache.getQueryData('userProfile') as UserProfile

  useEffect(() => {
    userProfile?.images?.length === 0 ? setToggle(false) : null
  }, [userProfile])

  useEffect(() => {
    setBuyLink(selectedImage?.buyLink)
    setPrice(selectedImage?.price)
    setImageName(selectedImage?.name)
    setLightIntensity(selectedImage?.lighting)
  }, [selectedImage])

  useDebouncedEffect(
    () => {
      updateImage('lighting', lightIntensity)
    },
    500,
    [lightIntensity]
  )

  const fileInputRef = useRef(null)
  const nameFieldRef = useRef(null)
  const priceFieldRef = useRef(null)
  const buyLinkFieldRef = useRef(null)

  const slideInOut = useSpring({
    transform: toggle ? 'translate3d(0, -50%, 0)' : 'translate3d(88%, -50%, 0)',
    config: { mass: 1, tension: 120, friction: 18 },
  })

  const handleLightIntensity = e => {
    setLightIntensity(e.target.value)
  }

  return (
    <>
      <Wrapper style={slideInOut}>
        <ToggleButton
          onClick={() => {
            setToggleProfile(false)
            setToggle(prev => !prev)
          }}
          disabled={userProfile?.images?.length === 0}
        >
          {toggle ? <MdRemove size={26} /> : <MdAdd size={26} />}
        </ToggleButton>
        <Container>
          <TempLogo>
            <img src={Logo} alt="logo" width={270} />
          </TempLogo>
          <Elements>
            <form
              onSubmit={e => {
                e.preventDefault()
                updateImage('name', imageName)
                setShowSuccessMsg('Saved name to artwork')
                setSubmitted(true)
                nameFieldRef.current.blur()
              }}
              style={{ flex: 4 }}
            >
              <InputFieldRow>
                <Label style={{ display: 'block' }}>Artwork name</Label>
                <InputField
                  value={imageName}
                  ref={nameFieldRef}
                  name="artworkName"
                  onFocus={() => setFieldFocused('name')}
                  onBlur={() => setTimeout(() => setFieldFocused(''), 200)}
                  onChange={e => {
                    setSubmitted(false)
                    setImageName(e.target.value)
                  }}
                />
                {selectedImage?.name?.length > 0 &&
                  !submitted &&
                  fieldFocused === 'name' && (
                    <Add>
                      <MdAddCircle
                        size={24}
                        color="green"
                        onClick={e => {
                          e.preventDefault()
                          updateImage('name', imageName)
                          setShowSuccessMsg('Saved name to artwork')
                          setSubmitted(true)
                          nameFieldRef.current.blur()
                        }}
                      />
                    </Add>
                  )}
              </InputFieldRow>
            </form>
            <CheckboxGrid>
              <div>
                <BorderCheckbox>
                  <label>
                    <Checkbox
                      name="border"
                      checked={selectedImage?.border}
                      onChange={() =>
                        updateImage('border', !selectedImage?.border)
                      }
                    />
                    <BorderCheckboxLabel>Border</BorderCheckboxLabel>
                  </label>
                </BorderCheckbox>
                <TextureCheckbox>
                  <label>
                    <Checkbox
                      name="texture"
                      checked={selectedImage?.texture}
                      onChange={() =>
                        updateImage('texture', !selectedImage?.texture)
                      }
                    />
                    <TextureCheckboxLabel>Texture</TextureCheckboxLabel>
                  </label>
                </TextureCheckbox>
              </div>
              <div>
                <BackgroudCheckbox>
                  <label>
                    <Checkbox
                      name="background"
                      checked={selectedImage?.background}
                      onChange={() =>
                        updateImage('background', !selectedImage?.background)
                      }
                    />
                    <BackgroudCheckboxLabel>
                      Light background
                    </BackgroudCheckboxLabel>
                  </label>
                </BackgroudCheckbox>
                <BackgroudCheckbox>
                  <label>
                    <Checkbox
                      name="rotate"
                      checked={selectedImage?.rotate}
                      onChange={() =>
                        updateImage('rotate', !selectedImage?.rotate)
                      }
                    />
                    <BackgroudCheckboxLabel>
                      Rotate 90˚ CW
                    </BackgroudCheckboxLabel>
                  </label>
                </BackgroudCheckbox>
              </div>
            </CheckboxGrid>
          </Elements>
          <ZoomRange>
            <ZoomTitle>Spotlight intensity</ZoomTitle>
            <ZoomText>{lightIntensity}%</ZoomText>
            <input
              type="range"
              min="0"
              max="20"
              onChange={handleLightIntensity}
              value={lightIntensity}
            />
          </ZoomRange>
          <BuyWrapper>
            <form
              onSubmit={e => {
                e.preventDefault()
                updateImage('price', price)
                setShowSuccessMsg('Saved price to artwork')
                setSubmitted(true)
                priceFieldRef.current.blur()
              }}
              style={{ flex: 4 }}
            >
              <InputFieldRow style={{ marginBottom: '1rem' }}>
                <Label style={{ display: 'block' }}>Price</Label>
                <InputField
                  type="number"
                  step="0.01"
                  value={price}
                  ref={priceFieldRef}
                  name="price"
                  onFocus={() => setFieldFocused('price')}
                  onBlur={() => setTimeout(() => setFieldFocused(''), 200)}
                  onChange={e => {
                    setSubmitted(false)
                    setPrice(parseFloat(e.target.value))
                  }}
                />
                {price > 0 && !submitted && fieldFocused === 'price' && (
                  <Add>
                    <MdAddCircle
                      size={24}
                      color="green"
                      onClick={e => {
                        e.preventDefault()
                        updateImage('price', price)
                        setShowSuccessMsg('Saved price to artwork')
                        setSubmitted(true)
                        priceFieldRef.current.blur()
                      }}
                    />
                  </Add>
                )}
              </InputFieldRow>
            </form>
            <form
              onSubmit={e => {
                e.preventDefault()
                updateImage('buyLink', buyLink)
                setShowSuccessMsg('Saved buy link to artwork')
                setSubmitted(true)
                buyLinkFieldRef.current.blur()
              }}
              style={{ flex: 4 }}
            >
              <InputFieldRow>
                <Label style={{ display: 'block' }}>Buy link</Label>
                <InputField
                  value={buyLink}
                  ref={buyLinkFieldRef}
                  name="buyLink"
                  onFocus={() => setFieldFocused('buyLink')}
                  onBlur={() => setTimeout(() => setFieldFocused(''), 200)}
                  onChange={e => {
                    setSubmitted(false)
                    setBuyLink(e.target.value)
                  }}
                />
                {buyLink?.length > 0 &&
                  !submitted &&
                  fieldFocused === 'buyLink' && (
                    <Add>
                      <MdAddCircle
                        size={24}
                        color="green"
                        onClick={e => {
                          e.preventDefault()
                          updateImage('buyLink', buyLink)
                          setShowSuccessMsg('Saved buy link to artwork')
                          setSubmitted(true)
                          buyLinkFieldRef.current.blur()
                        }}
                      />
                    </Add>
                  )}
              </InputFieldRow>
            </form>
          </BuyWrapper>
          <DownloadButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSnap(true)
            }}
          >
            <MdPhotoCamera style={{ marginRight: 10 }} />
            Take screenshot
          </DownloadButton>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            accept="image/x-png,image/jpeg"
            onChange={e => {
              usePhotoUpload({ e, setErrMsg, setLoader, selectImage })
            }}
          />
          <AddArtButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <MdAddAPhoto style={{ marginRight: 10 }} />
            {loader ? loader : 'Add image to gallery'}
          </AddArtButton>
        </Container>
        <SocialBar
          toggleProfile={toggleProfile}
          setToggleProfile={setToggleProfile}
        />
      </Wrapper>
      {showSuccessMsg && (
        <Toast
          message={showSuccessMsg}
          resetState={() => setShowSuccessMsg('')}
          delay={3000}
        />
      )}
    </>
  )
}

// Styles
const Wrapper = styled(animated.div)`
  background: white;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  position: absolute;
  z-index: 1000;
  top: 50%;
  right: 0rem;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.15);
  z-index: 2;

  input[type='range'] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: grab;
    background: #f4f4f4;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type='range']::-webkit-slider-thumb {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: #623cea;
    cursor: grab;
    -webkit-appearance: none;
    margin-top: -9px;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #f4f4f4;
  }
  input[type='range']::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: grab;
    background: #623cea;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type='range']::-moz-range-thumb {
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type='range']::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type='range']::-ms-fill-lower {
    background: #623cea;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
  }
  input[type='range']::-ms-fill-upper {
    background: #623cea;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
  }
  input[type='range']::-ms-thumb {
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type='range']:focus::-ms-fill-lower {
    background: #623cea;
  }
  input[type='range']:focus::-ms-fill-upper {
    background: #623cea;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 20;
  background: #fff;
  padding: 6rem 5rem;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`

const Elements = styled.div`
  display: flex;
  flex-direction: column;
`

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const InputFieldRow = styled.div`
  margin-bottom: 2.8rem;
  position: relative;
`

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
`

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background: #f4f4f4;
  font-size: 1.4rem;
  color: #333;
  font-family: inherit;
  outline: none;
`

const Add = styled.div`
  position: absolute;
  right: 10px;
  top: 28px;
  cursor: pointer;
  z-index: 1000;
`

const BorderCheckbox = styled.div``

const BorderCheckboxLabel = styled.span`
  font-size: 1.4rem;
  margin-left: 10px;
  font-weight: 500;
  color: #333;
`

const TextureCheckbox = styled.div`
  margin-top: 10px;
`

const TextureCheckboxLabel = styled.span`
  font-size: 14px;
  margin-left: 10px;
  font-weight: 500;
  color: #333;
`

const BackgroudCheckbox = styled.div`
  margin-bottom: 10px;
`

const BackgroudCheckboxLabel = styled.span`
  font-size: 1.4rem;
  margin-left: 10px;
  font-weight: 500;
  color: #333;
`

const ZoomRange = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`

const ZoomTitle = styled.h5`
  font-size: 14px;
  margin-top: 1rem;
  margin-bottom: 10px;
  color: #333;
`

const ZoomText = styled.span`
  color: #333;
`

const BuyWrapper = styled.div`
  display: grid;
  grid-template-columns: 7.5rem 21.5rem;
  grid-gap: 1.5rem;
  margin-bottom: 1rem;
`

const DownloadButton = styled(motion.button)`
  background: #623cea;
  padding: 1.5rem 3.8rem;
  border: none;
  color: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 5px;
  box-shadow: 0 5px #4923d1;
  cursor: pointer;
  margin-bottom: 3rem;
`

const AddArtButton = styled(motion.button)`
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
  width: 23rem;
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
const ToggleButton = styled.button`
  position: absolute;
  z-index: 30;
  left: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};
`
