import React, { useState, Dispatch, SetStateAction, ReactElement } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

interface Props {
  photoGallery: Photo[]
  setPhotoPreview: Dispatch<SetStateAction<string>>
  setPhotoRatio: Dispatch<SetStateAction<number>>
}

interface Photo {
  src: string
  ratio: number
}

export const Gallery = ({
  photoGallery,
  setPhotoPreview,
  setPhotoRatio,
}: Props): ReactElement => {
  const [toggle, setToggle] = useState<boolean>(false)

  const slideInOut = useSpring({
    transform: toggle
      ? "translate3d(-85%, -50%, 0)"
      : "translate3d(0%, -50%, 0)",
    config: { mass: 1, tension: 120, friction: 18 },
  })

  return (
    <Wrapper
      style={slideInOut}
      onClick={() => setToggle(prevState => !prevState)}
    >
      <Container>
        <Grid photoGalleryLength={photoGallery.length}>
          {photoGallery.map(photo => (
            <Thumbnail
              src={photo.src}
              key={photo.src}
              alt="Preview thumbnail"
              width={60}
              height={60}
              onClick={e => {
                e.stopPropagation()
                setPhotoPreview(photo.src)
                setPhotoRatio(photo.ratio)
              }}
            />
          ))}
        </Grid>
      </Container>
      <Text>Gallery</Text>
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

const Thumbnail = styled.img`
  border-radius: 50%;
  cursor: pointer;
`

const Text = styled.span`
  display: block;
  transform: rotate(90deg);
  color: #999;
  position: absolute;
  left: 60px;
  padding-left: 20px;
  top: calc(50% - 2rem);
  font-size: 1.4rem;
  cursor: pointer;
`
