import React, { useContext, Dispatch, SetStateAction } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { navigate } from 'gatsby'

import { ArtworkContext } from '../../context/artwork-context'

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
  rotate: boolean
  border: boolean
  texture: boolean
  background: boolean
}

interface Props {
  photoGallery: Photo[]
  photoPreview: string
  setPhotoPreview: Dispatch<SetStateAction<string>>
  setPhotoRatio: Dispatch<SetStateAction<number>>
}

const ProfileControls: React.FC<Props> = ({
  photoGallery,
  photoPreview,
  setPhotoPreview,
  setPhotoRatio,
}) => {
  const {
    setArtworkName,
    setBackgroundColor,
    setShowBorder,
    setShowTexture,
    setRotateIncrement,
    backgroundColor,
    username,
  } = useContext(ArtworkContext)

  // Find current index of selected artwork
  const currentItem = photoGallery.findIndex(
    photo => photo.src === photoPreview
  )
  const prevItem = photoGallery[currentItem - 1]
  const nextItem = photoGallery[currentItem + 1]
  const galleryLength = photoGallery.length

  const handlePrevItem = () => {
    if (currentItem - 1 >= 0) {
      navigate(`/profile/${username}/${prevItem.id}`)
      setPhotoPreview(prevItem.src)
      setPhotoRatio(prevItem.ratio)
      setArtworkName(prevItem.name)
      setBackgroundColor(prevItem.background)
      setShowBorder(prevItem.border)
      setShowTexture(prevItem.texture)
      setRotateIncrement(prevItem.rotate)
    }
  }

  const handleNextItem = () => {
    if (currentItem + 1 <= galleryLength - 1) {
      navigate(`/profile/${username}/${nextItem.id}`)
      setPhotoPreview(nextItem.src)
      setPhotoRatio(nextItem.ratio)
      setArtworkName(nextItem.name)
      setBackgroundColor(nextItem.background)
      setShowBorder(nextItem.border)
      setShowTexture(nextItem.texture)
      setRotateIncrement(nextItem.rotate)
    }
  }

  return (
    <Wrapper>
      {currentItem - 1 >= 0 && (
        <>
          <LeftArrow
            backgroundColor={backgroundColor ? true : false}
            data-tip={prevItem && prevItem.name}
            size={48}
            onClick={handlePrevItem}
          />
          <ReactTooltip />
        </>
      )}
      {currentItem + 1 <= galleryLength - 1 && (
        <>
          <RightArrow
            backgroundColor={backgroundColor ? true : false}
            data-tip={nextItem && nextItem.name}
            size={48}
            onClick={handleNextItem}
          />
          <ReactTooltip />
        </>
      )}
    </Wrapper>
  )
}

export default ProfileControls

// Styles
const Wrapper = styled.div``

const LeftArrow = styled(MdChevronLeft)`
  position: absolute;
  top: 50%;
  left: 15rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${props => (props.backgroundColor ? '#333' : '#f4f4f4')};
`

const RightArrow = styled(MdChevronRight)`
  position: absolute;
  top: 50%;
  right: 15rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${props => (props.backgroundColor ? '#333' : '#f4f4f4')};
`
