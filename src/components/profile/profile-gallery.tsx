import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import ScrollArea from 'react-scrollbar'
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
  lighting: string
}

interface Props {
  photoGallery: Photo[]
  setPhotoPreview: Dispatch<SetStateAction<string>>
  setPhotoRatio: Dispatch<SetStateAction<number>>
}

interface StyledProps {
  disabled?: boolean
  backgroundColor?: boolean
}

const ProfileGallery: React.FC<Props> = ({
  photoGallery,
  setPhotoPreview,
  setPhotoRatio,
}) => {
  const [toggle, setToggle] = useState<boolean>(true)
  const [photoId, setPhotoId] = useState('')

  const {
    setArtworkName,
    setBackgroundColor,
    backgroundColor,
    setShowBorder,
    setShowTexture,
    setRotateIncrement,
    setLightIntensity,
    username,
  } = useContext(ArtworkContext)

  useEffect(() => {
    if (photoGallery && photoGallery.length === 0) {
      setToggle(false)
    }
  }, [photoGallery])

  const slideInOut = useSpring({
    transform: toggle
      ? 'translate3d(0%, -50%, 0)'
      : 'translate3d(-86%, -50%, 0)',
    config: { mass: 1, tension: 120, friction: 18 },
  })

  return (
    <Wrapper
      style={slideInOut}
      onClick={() => setToggle(prevState => !prevState)}
      disabled={photoGallery.length === 0}
    >
      <Container>
        <ScrollArea
          style={{
            height: 400,
            width: 100,
            background: 'rgba(255, 255, 255, 0.05)',
            borderTopRightRadius: '23px',
            borderBottomRightRadius: '23px',
            boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
          }}
          speed={0.8}
          smoothScrolling
          verticalScrollbarStyle={{ background: '#000' }}
          verticalContainerStyle={{ background: '#eee' }}
        >
          {photoGallery.map((photo, index) => {
            return (
              <ThumbnailWrapper>
                <Thumbnail
                  src={photo.src}
                  key={photo.id}
                  alt="Preview thumbnail"
                  width={60}
                  height={60}
                  lastImage={photoGallery.length - 1 === index}
                  onClick={e => {
                    e.stopPropagation()
                    navigate(`/profile/${username}/${photo.id}`)
                    setPhotoId(photo.id)
                    setPhotoPreview(photo.src)
                    setPhotoRatio(photo.ratio)
                    setArtworkName(photo.name)
                    setBackgroundColor(photo.background)
                    setShowBorder(photo.border)
                    setShowTexture(photo.texture)
                    setRotateIncrement(photo.rotate)
                    setLightIntensity(photo.lighting)
                  }}
                />
              </ThumbnailWrapper>
            )
          })}
        </ScrollArea>
      </Container>
      <Text backgroundColor={backgroundColor ? true : false}>Gallery</Text>
    </Wrapper>
  )
}

export default ProfileGallery

// Styles
const Wrapper = styled(animated.div)`
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 0;
  pointer-events: ${(props: StyledProps) => (props.disabled ? 'none' : 'all')};
`

const Container = styled.div`
  position: relative;
  height: 400px;
`

const Grid = styled.div`
  background: rgba(255, 255, 255, 0.05);
  width: 85px;
  height: 400px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(
    ${(props: { photoGalleryLength: number }) => props.photoGalleryLength},
    75px
  );
  justify-items: center;
  padding-top: 20px;
  margin-bottom: 20px;
  grid-gap: 5px;
  border-top-right-radius: 23px;
  border-bottom-right-radius: 23px;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
`

const ThumbnailWrapper = styled.div`
  position: relative;
`

const Thumbnail = styled.img`
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin: 1.5rem 0 0rem 1.5rem;
  ${(props: { lastImage: boolean }) =>
    props.lastImage && 'margin-bottom: 2rem'};
`

const Text = styled.span`
  display: block;
  transform: rotate(90deg);
  color: ${(props: StyledProps) => (props.backgroundColor ? '#333' : '#999')};
  position: absolute;
  left: 77px;
  padding-left: 20px;
  top: calc(50% - 2rem);
  font-size: 1.4rem;
  cursor: pointer;
`
