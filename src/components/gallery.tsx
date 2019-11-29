import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  Suspense,
} from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import axios from 'axios'
import cookie from 'js-cookie'

import { ArtworkContext } from '../context/artwork-context'

const ScrollAreaLazy = React.lazy(() => import('react-scrollbar'))

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
  setPhotoGallery: Dispatch<SetStateAction<Photo[]>>
  setPhotoPreview: Dispatch<SetStateAction<string>>
  setPhotoRatio: Dispatch<SetStateAction<number>>
}

interface StyledProps {
  disabled?: boolean
  backgroundColor?: boolean
}

const Gallery: React.FC<Props> = ({
  photoGallery,
  setPhotoGallery,
  setPhotoPreview,
  setPhotoRatio,
}) => {
  const [toggle, setToggle] = useState<boolean>(true)

  const {
    setArtworkName,
    setBackgroundColor,
    backgroundColor,
    setShowBorder,
    setShowTexture,
    setRotateIncrement,
    setLightIntensity,
  } = useContext(ArtworkContext)

  useEffect(() => {
    if (photoGallery && photoGallery.length === 0) {
      setToggle(false)
    }
  }, [photoGallery])

  const removeArtwork = async (e, id: string): Promise<void> => {
    e.stopPropagation()

    const token = cookie.getJSON('vc_token')

    const index = photoGallery.findIndex(photo => photo.id === id)

    await axios.delete(`https://api.virtualcanvas.app/api/artwork/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Token: token,
      },
    })

    if (index >= 0) {
      setPhotoGallery(prevState => {
        const copy = [...prevState]
        copy.splice(index, 1)
        return copy
      })
    }
  }

  const slideInOut = useSpring({
    transform: toggle
      ? 'translate3d(0%, -50%, 0)'
      : 'translate3d(-86%, -50%, 0)',
    config: { mass: 1, tension: 120, friction: 18 },
  })

  const isSSR = typeof window === 'undefined'

  return (
    <Wrapper
      style={slideInOut}
      onClick={() => setToggle(prevState => !prevState)}
      disabled={photoGallery.length === 0}
    >
      <Container>
        {!isSSR && (
          <Suspense fallback={<div />}>
            <ScrollAreaLazy
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
                const prevItem = photoGallery[index - 1]
                const nextItem = photoGallery[index + 1]
                return (
                  <ThumbnailWrapper key={photo.id}>
                    <Thumbnail
                      src={photo.src}
                      alt="Preview thumbnail"
                      width={60}
                      height={60}
                      lastImage={photoGallery.length - 1 === index}
                      onClick={e => {
                        e.stopPropagation()
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
                    <CloseIcon
                      size={16}
                      color="white"
                      onClick={e => {
                        if (prevItem) {
                          setPhotoPreview(prevItem.src)
                          setArtworkName(prevItem.name)
                          setPhotoRatio(prevItem.ratio)
                          setBackgroundColor(prevItem.background)
                          setShowBorder(prevItem.border)
                          setShowTexture(prevItem.texture)
                          setRotateIncrement(prevItem.rotate)
                          setLightIntensity(prevItem.lighting)
                        } else if (nextItem) {
                          setPhotoPreview(nextItem.src)
                          setArtworkName(nextItem.name)
                          setPhotoRatio(nextItem.ratio)
                          setBackgroundColor(nextItem.background)
                          setShowBorder(nextItem.border)
                          setShowTexture(nextItem.texture)
                          setRotateIncrement(nextItem.rotate)
                          setLightIntensity(nextItem.lighting)
                        } else {
                          setPhotoPreview(null)
                          setArtworkName('')
                        }
                        removeArtwork(e, photo.id)
                      }}
                    />
                  </ThumbnailWrapper>
                )
              })}
            </ScrollAreaLazy>
          </Suspense>
        )}
      </Container>
      <Text backgroundColor={backgroundColor ? true : false}>Gallery</Text>
    </Wrapper>
  )
}

export default Gallery

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

const CloseIcon = styled(MdClose)`
  position: absolute;
  top: 1.2rem;
  right: 2.2rem;
  background: #111;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: opacity 300ms ease-in-out;

  ${ThumbnailWrapper}:hover & {
    opacity: 1;
  }
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
