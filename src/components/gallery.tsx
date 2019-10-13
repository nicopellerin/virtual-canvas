import React, { useState } from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

interface Props {
  photoGallery: Photo[]
  setPhotoPreview: (photo: {}) => string
  setPhotoRatio: (photo: {}) => number
}

interface Photo {
  src: string
  ratio: number
}

export const Gallery = ({
  photoGallery,
  setPhotoPreview,
  setPhotoRatio,
}: Props) => {
  const [toggle, setToggle] = useState<Boolean>(false)

  const slideInOut = useSpring({
    transform: toggle
      ? "translate3d(-50%, -50%, 0)"
      : "translate3d(0, -50%, 0)",
    config: { mass: 1, tension: 120, friction: 18 },
  })

  return (
    <animated.div
      style={
        (slideInOut,
        { position: "absolute", zIndex: 1000, top: "50%", left: 0 })
      }
    >
      <div style={{ position: "relative", height: "400px" }}>
        <div
          onClick={() => setToggle(prev => !prev)}
          style={{
            transform: "translateY(-50%)",
            background: photoGallery
              ? "rgba(255,255,255, 0.05)"
              : "rgba(255, 255, 255, 0.05)",
            width: 80,
            height: 400,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: `repeat(${photoGallery.length}, 75px)`,
            justifyItems: "center",
            paddingTop: 20,
            marginBottom: 20,
            gridGap: 5,
            borderTopRightRadius: 23,
            borderBottomRightRadius: 23,
            boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          {photoGallery.map(photo => (
            <img
              src={photo.src}
              key={photo.src}
              alt=""
              width={60}
              height={60}
              style={{
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => {
                setPhotoPreview(photo.src)
                setPhotoRatio(photo.ratio)
              }}
            />
          ))}
        </div>
        <Text>Gallery</Text>
      </div>
    </animated.div>
  )
}

export default Gallery

// Styles
const Text = styled.span`
  display: block;
  transform: rotate(90deg);
  color: #999;
  position: absolute;
  left: 65px;
  top: -20px;
  font-size: 1.4rem;
`
