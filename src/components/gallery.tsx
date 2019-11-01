import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"
import { MdClose } from "react-icons/md"
import axios from "axios"
import cookie from "js-cookie"

import { ArtworkContext } from "../context/artwork-context"

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
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

export const Gallery: React.FC<Props> = ({
  photoGallery,
  setPhotoGallery,
  setPhotoPreview,
  setPhotoRatio,
}) => {
  const [toggle, setToggle] = useState<boolean>(true)

  const { setArtworkName, backgroundColor } = useContext(ArtworkContext)

  useEffect(() => {
    if (photoGallery && photoGallery.length === 0) {
      setToggle(false)
    }
  }, [photoGallery])

  const removeArtwork = async (e, id: string): Promise<void> => {
    e.stopPropagation()

    const token = cookie.getJSON("vc_token")

    const index = photoGallery.findIndex(photo => photo.id === id)

    await axios.delete(`https://api.virtualcanvas.app/api/artwork/${id}`, {
      headers: {
        "Content-Type": "application/json",
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
      ? "translate3d(0%, -50%, 0)"
      : "translate3d(-86%, -50%, 0)",
    config: { mass: 1, tension: 120, friction: 18 },
  })

  return (
    <Wrapper
      style={slideInOut}
      onClick={() => setToggle(prevState => !prevState)}
      disabled={photoGallery.length === 0}
    >
      <Container>
        <Grid photoGalleryLength={photoGallery.length}>
          {photoGallery.map((photo, index) => {
            const prevItem = photoGallery[index - 1]
            const nextItem = photoGallery[index + 1]
            return (
              <ThumbnailWrapper>
                <Thumbnail
                  src={photo.src}
                  key={photo.id}
                  alt="Preview thumbnail"
                  width={60}
                  height={60}
                  onClick={e => {
                    e.stopPropagation()
                    setPhotoPreview(photo.src)
                    setPhotoRatio(photo.ratio)
                    setArtworkName(photo.name)
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
                    } else if (nextItem) {
                      setPhotoPreview(nextItem.src)
                      setArtworkName(nextItem.name)
                      setPhotoRatio(nextItem.ratio)
                    } else {
                      setPhotoPreview(null)
                      setArtworkName("")
                    }
                    removeArtwork(e, photo.id)
                  }}
                />
              </ThumbnailWrapper>
            )
          })}
        </Grid>
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
  pointer-events: ${(props: StyledProps) => (props.disabled ? "none" : "all")};
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
  cursor: pointer;
`

const CloseIcon = styled(MdClose)`
  position: absolute;
  top: 0;
  right: 0;
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
  color: ${(props: StyledProps) => (props.backgroundColor ? "#333" : "#999")};
  position: absolute;
  left: 60px;
  padding-left: 20px;
  top: calc(50% - 2rem);
  font-size: 1.4rem;
  cursor: pointer;
`
