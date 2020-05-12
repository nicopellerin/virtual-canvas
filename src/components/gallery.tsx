import React, { useState, useEffect, Suspense } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'

import { queryCache } from 'react-query'

import useSelectedImage from '../hooks/useSelectedImage'
import { isPublicProfile } from '../utils/utils'
import { UserProfile, PublicProfile } from '../modules/types'

const ScrollAreaLazy = React.lazy(() => import('react-scrollbar'))

interface StyledProps {
  disabled?: boolean
  backgroundColor?: boolean
  selectedImage: any
  selectImage: any
}

interface Props {
  selectedImage: any
  selectImage: (image) => void
  type: string
}

const Gallery: React.FC<Props> = ({
  selectedImage,
  selectImage,
  type = 'userProfile',
}) => {
  const [toggle, setToggle] = useState(true)
  const profile = queryCache.getQueryData(type) as UserProfile | PublicProfile
  const { removeImage } = useSelectedImage()

  useEffect(() => {
    if (profile?.images?.length === 0) {
      setToggle(false)
    }
  }, [profile])

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
      disabled={profile?.images?.length === 0}
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
              verticalScrollbarStyle={{ background: '#000' }}
              verticalContainerStyle={{ background: '#eee' }}
            >
              {profile?.images?.map((image, index) => {
                const prevImage = profile?.images[index - 1]
                const nextImage = profile?.images[index + 1]
                return (
                  <ThumbnailWrapper key={image.id}>
                    <Thumbnail
                      src={image.src}
                      alt="Preview thumbnail"
                      width={60}
                      height={60}
                      lastImage={profile?.images?.length - 1 === index}
                      onClick={e => {
                        e.stopPropagation()
                        selectImage(image)
                      }}
                    />
                    {!isPublicProfile && (
                      <CloseIcon
                        size={16}
                        color="white"
                        onClick={e => {
                          if (prevImage) {
                            selectImage(prevImage)
                          } else if (nextImage) {
                            selectImage(nextImage)
                          } else {
                            selectImage(null)
                          }
                          removeImage(e, image.id)
                        }}
                      />
                    )}
                  </ThumbnailWrapper>
                )
              })}
            </ScrollAreaLazy>
          </Suspense>
        )}
      </Container>
      <Text backgroundColor={selectedImage?.background ? true : false}>
        Gallery
      </Text>
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
