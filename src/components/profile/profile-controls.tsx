import React, { useContext, Dispatch, SetStateAction } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"

import { ArtworkContext } from "../../context/artwork-context"

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
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
  const { setArtworkName } = useContext(ArtworkContext)

  // Find current index of selected artwork
  const currentItem = photoGallery.findIndex(
    photo => photo.src === photoPreview
  )
  const prevItem = photoGallery[currentItem - 1]
  const nextItem = photoGallery[currentItem + 1]
  const galleryLength = photoGallery.length

  const handlePrevItem = () => {
    if (currentItem - 1 >= 0) {
      setPhotoPreview(prevItem.src)
      setPhotoRatio(prevItem.ratio)
      setArtworkName(prevItem.name)
    }
  }

  const handleNextItem = () => {
    if (currentItem + 1 <= galleryLength - 1) {
      setPhotoPreview(nextItem.src)
      setPhotoRatio(nextItem.ratio)
      setArtworkName(nextItem.name)
    }
  }

  return (
    <Wrapper>
      {currentItem - 1 >= 0 && (
        <>
          <LeftArrow
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
  color: white;
`

const RightArrow = styled(MdChevronRight)`
  position: absolute;
  top: 50%;
  right: 15rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
`
