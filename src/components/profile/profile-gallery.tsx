import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import { ArtworkContext } from "../../context/artwork-context"

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
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

  const { setArtworkName, backgroundColor } = useContext(ArtworkContext)

  useEffect(() => {
    if (photoGallery && photoGallery.length === 0) {
      setToggle(false)
    }
  }, [photoGallery])

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
          {photoGallery.map(photo => {
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
              </ThumbnailWrapper>
            )
          })}
        </Grid>
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