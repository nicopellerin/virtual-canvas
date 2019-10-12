import React, { useState } from "react"
import { useSpring, animated } from "react-spring"

export const Gallery = ({ photoGallery, setPhotoPreview, setPhotoRatio }) => {
  const [toggle, setToggle] = useState(false)

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
      <div
        onClick={() => setToggle(prev => !prev)}
        style={{
          transform: "translateY(-50%)",
          background: photoGallery
            ? "rgba(255,255,255, 0.02)"
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
    </animated.div>
  )
}

export default Gallery
