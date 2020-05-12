import * as React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { queryCache } from 'react-query'

import { Image, PublicProfile } from '../../modules/types'

interface Props {
  selectedImage: Image
  selectImage: (image: Image) => void
}

const ProfileControls: React.FC<Props> = ({ selectedImage, selectImage }) => {
  const publicProfile = queryCache.getQueryData(
    'publicProfile'
  ) as PublicProfile

  const currentItem = publicProfile?.images?.findIndex(
    photo => photo.src === selectedImage?.src
  )
  const prevItem = publicProfile?.images[currentItem - 1]
  const nextItem = publicProfile?.images[currentItem + 1]
  const galleryLength = publicProfile?.images?.length

  const handlePrevItem = () => {
    if (currentItem - 1 >= 0) {
      selectImage(prevItem)
    }
  }

  const handleNextItem = () => {
    if (currentItem + 1 <= galleryLength - 1) {
      selectImage(nextItem)
    }
  }

  return (
    <Wrapper>
      {currentItem - 1 >= 0 && (
        <>
          <LeftArrow
            // backgroundColor={backgroundColor ? true : false}
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
            // backgroundColor={backgroundColor ? true : false}
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
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
`

const RightArrow = styled(MdChevronRight)`
  position: absolute;
  top: 50%;
  right: 15rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${(props: { background: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
`
